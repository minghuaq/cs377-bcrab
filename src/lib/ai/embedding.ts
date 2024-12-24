import { cosineSimilarity } from "ai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateChunks = (input: string): string[] => {
    return input
        .trim()
        .split(".")
        .filter((i) => i !== "");
};

export const generateEmbeddings = async (
    value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = generateChunks(value);
    try {
        // const { embeddings } = await embedMany({
        //     model: embeddingModel,
        //     values: chunks,
        // });
        const embeddings: number[][] = [];
        for (const chunk of chunks) {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/llmrails/ember-v1",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        inputs: chunk,
                    }),
                }
            );
            const result = await response.json();
            embeddings.push(await result);
        }
        return embeddings.map((e, i) => ({ embedding: e, content: chunks[i] }));
    } catch (err) {
        console.log(err);
        return [{ embedding: [], content: "" }];
    }
};
export const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replaceAll("\\n", " ");
    // const { embedding } = await embed({
    //     model: embeddingModel,
    //     value: input,
    // });
    const response = await fetch(
        "https://api-inference.huggingface.co/models/llmrails/ember-v1",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: input,
            }),
        }
    );
    const result = await response.json();
    return result;
};

export const findRelevantContent = async (userQuery: string) => {
    const similarLimit = 4
    const userQueryEmbedded = await generateEmbedding(userQuery);
    const allEmbeddings: { content: string; embedding: string }[] =
        await prisma.$queryRaw`
        SELECT e.content as content, e.embedding::text as embedding
        FROM "Embeddings" e;
        `;
    let embedding: number[] | null = null;
    let similarEmbeddings: { content: string; similarity: number }[] = [];
    for (const content of allEmbeddings) {
        const embeddingString = content.embedding;
        if (embeddingString == null || typeof embeddingString == "undefined") {
            continue;
        }
        embedding = embeddingString
            .slice(1, embeddingString.length - 1) // remove the brackets []
            .split(",")
            .map((v) => parseFloat(v));

        const similarity = cosineSimilarity(userQueryEmbedded, embedding);
        if (similarity > 0.5) {
            similarEmbeddings.push({
                content: content.content,
                similarity: similarity,
            });
        }
    }
    similarEmbeddings.sort((a, b) => b.similarity - a.similarity);
    const similarGuides = similarEmbeddings.map((similar) => {
        return similar.content;
    });
    console.log("full similarity: ", similarGuides)
    console.log(similarGuides.slice(0, Math.min(similarGuides.length, similarLimit)))
    return similarGuides.slice(0, Math.min(similarGuides.length, similarLimit));
};

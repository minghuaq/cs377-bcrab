import { PrismaClient } from "@prisma/client";
import { openai } from "@ai-sdk/openai";
import { cosineSimilarity, embed, embedMany } from "ai";

const prisma = new PrismaClient();
const model = openai.embedding("text-embedding-3-large");

const generateChunks = (input: string): string[] => {
    // For course information and structured data, we want to be more conservative about splitting
    // Only split on clear sentence boundaries that are followed by a new sentence
    const trimmed = input.trim();
    
    // If the content is relatively short (less than 500 characters), don't split it
    if (trimmed.length < 500) {
        return [trimmed];
    }
    
    // For longer content, split on clear sentence boundaries
    // Look for sentence-ending punctuation followed by whitespace and a capital letter
    // But be more conservative - only split if there's significant whitespace or a newline
    return trimmed
        .replace(/([.?!])\s*\n\s*(?=[A-Z])/g, "$1|")  // Split on sentence end + newline + capital
        .replace(/([.?!])\s{2,}(?=[A-Z])/g, "$1|")    // Split on sentence end + multiple spaces + capital
        .split("|")
        .filter((chunk) => chunk.trim() !== "")
        .map((chunk) => chunk.trim());
};

export const generateEmbeddings = async (
    value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
    console.log(value);
    const chunks = generateChunks(value);
    console.log(chunks);
    try {
        const { embeddings } = await embedMany({
            model: openai.embedding("text-embedding-3-small"),
            values: chunks,
        });
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
    const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: input,
    });

    return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
    console.log(userQuery);
    const similarLimit = 100;
    const userQueryEmbedded = await generateEmbedding(userQuery);
    console.log(userQueryEmbedded);
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
    console.log("full similarity: ", similarGuides);
    console.log(
        similarGuides.slice(0, Math.min(similarGuides.length, similarLimit))
    );
    return similarGuides.slice(0, Math.min(similarGuides.length, similarLimit));
};

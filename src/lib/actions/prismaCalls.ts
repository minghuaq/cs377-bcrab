import { auth } from "@/auth";
import { PrismaClient, Prisma } from "@prisma/client";
import { createId } from '@paralleldrive/cuid2';
import { generateEmbeddings } from "../ai/embedding";

const prisma = new PrismaClient();
export async function addMessage(
    message: string,
    dialogID: string,
    isAI: boolean
) {
    const session = await auth();
    const userEmail = session?.user?.email;
    if (!userEmail) {
        // TODO:Send the right thing maybe?
        return;
    }
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });
    // user would exist if logged in
    if (!user) {
        // TODO:Send the right thing maybe?
        return;
    }
    const userID = user.id;

    const timestamp = new Date().toISOString();

    const createMessage = await prisma.message.create({
        data: {
            message: message,
            isAI: isAI,
            timestamp: timestamp,
            dialog: {
                connectOrCreate: {
                    create: {
                        id: dialogID,
                        user: {
                            connectOrCreate: {
                                create: {
                                    email: userEmail,
                                },
                                where: {
                                    email: userEmail,
                                },
                            },
                        },
                    },
                    where: {
                        userId_id: {
                            id: dialogID,
                            userId: userID,
                        },
                    },
                },
            },
        },
        select: {
            dialogId: true,
            messageID: true,
        },
    });
    return createMessage;
}

export async function addResource(content: string) {
    // TODO: Implement user explicit resource creation
    // try {
    const resource = await prisma.resources.create({
        data: { content: content },
        select: {
            id: true,
        },
    });
    const embeddings = await generateEmbeddings(content);
    console.log(embeddings);
    for (const embedding of embeddings) {
        // const embeddingStr = `{${embedding.embedding.join(",")}}`;
        await prisma.$executeRaw(
            Prisma.sql`INSERT INTO "Embeddings" ("id", "resourceId", "content", "embedding") 
                VALUES (${createId()}, ${resource.id}, ${embedding.content}, ${embedding.embedding})`
        );
    }
    return "Resource successfully created and embedded.";
    // } catch (e) {
    //     if (e instanceof Error)
    //         console.log(
    //             e.message.length > 0 ? e.message : "Error, please try again."
    //         );
    // }
}

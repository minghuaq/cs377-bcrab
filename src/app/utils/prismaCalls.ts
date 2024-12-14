import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { AssistantContent, CoreMessage, CoreSystemMessage, Message, ToolContent, UserContent } from "ai";

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
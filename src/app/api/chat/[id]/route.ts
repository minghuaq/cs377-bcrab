import { NextRequest, NextResponse } from "next/server";
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
export async function POST(request: NextRequest) {
    const data = await request.json();
    const message = data.message;
    const dialogID = data.dialogID;
    const isAI = data.isAI;
    const createMessage = await addMessage(message, dialogID, isAI);
    return Response.json({ createMessage });
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const dialogID = (await params).id;
    const messages = await prisma.message.findMany({
        where: {
            dialogId: dialogID,
        },
        orderBy: {
            timestamp: "asc",
        },
    });

    return Response.json({ messages });
}

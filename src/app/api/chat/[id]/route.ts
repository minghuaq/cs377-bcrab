import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { log } from "console";
const prisma = new PrismaClient();
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const data = await request.json();
    const dialogID = (await params).id;
    const userID = data.userID;
    const message = data.message;
    const isAI = data.isAI;
    log(isAI);
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
                                    id: userID,
                                },
                                where: {
                                    id: userID,
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

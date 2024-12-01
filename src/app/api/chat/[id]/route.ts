import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { auth, NextAuthRequest } from "@/auth";

const prisma = new PrismaClient();

// export const POST = auth(async function POST(
export async function POST(
    request: NextRequest,
) {
    // if (!request.auth) {
    //     return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    // }

    const data = await request.json();
    const dialogID = data.dialogID;
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
//)

// export const GET = auth(async function GET(
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
//)

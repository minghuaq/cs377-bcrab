import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth"

const prisma = new PrismaClient();

export async function POST(
    request: NextRequest,
) {
    const session = await auth()

    const userEmail = session?.user?.email

    if (!userEmail) {
        return NextResponse.json({}, { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    })

    // user would exist if logged in
    if (!user) {
        return NextResponse.json({}, { status: 401 })
    }

    const data = await request.json();
    const dialogID = data.dialogID;
    const userID = user.id;
    const message = data.message;
    const isAI = data.isAI;

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
                                    email: userEmail
                                },
                                where: {
                                    email: userEmail
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

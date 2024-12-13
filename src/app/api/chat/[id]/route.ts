import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { AssistantContent, CoreMessage, CoreSystemMessage, Message, ToolContent, UserContent } from "ai";
import { addMessage } from "../../prismaCalls";

const prisma = new PrismaClient();

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

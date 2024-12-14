import { addMessage } from "@/app/utils/prismaCalls";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.json();
    const message = data.message;
    const dialogID = data.dialogID;
    const isAI = data.isAI;
    console.log("posting message")
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

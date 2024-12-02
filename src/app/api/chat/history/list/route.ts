import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return NextResponse.json({}, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });

    // user would exist if logged in
    if (!user) {
        return NextResponse.json({}, { status: 401 });
    }
    const chatHistory = await prisma.dialog.findMany({
        where: {
            userId: user.id,
        },
    });
    return Response.json({ chatHistory });
}

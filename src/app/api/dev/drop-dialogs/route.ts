import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
    request: NextRequest,
) {
    // Only allow endpoint in development environment
    if (process.env.NODE_ENV !== "development") {
        return Response.json({ status: 404 })
    }

    if (!request.body) {
        return Response.json({ status: 400 })
    }

    const user = (await request.json()).user

    if (!user || !user.email) {
        return Response.json({ status: 400 })
    }

    const getUser = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    })

    // user doesn't exist
    if (!getUser) {
        return NextResponse.json({}, { status: 400 })
    }

    const userId = getUser.id;

    const dropDialogs = await prisma.dialog.deleteMany({
        where: {
            userId: userId,
        }
    })

    if (dropDialogs) {
        return Response.json({status: 200})
    }

    return Response.json({status: 500})
}
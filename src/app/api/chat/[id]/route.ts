import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const userid = request.nextUrl.searchParams.get("userid")?.toString()
    const chatid = request.nextUrl.searchParams.get("chatid")?.toString()

    const product = { message: "Hello World", userid: userid, chatid: chatid };

    return Response.json({ product });
}

export async function POST(request: NextRequest) {
    // TODO: replace with auth
    const userid = request.nextUrl.searchParams.get("userid")?.toString()
    const chatid = request.nextUrl.searchParams.get("chatid")?.toString()
    const body = (await request.json()).message

    // const userMessage = searchParams.get('user')
    // TODO: Message Sanitization.

    const product = { message: "Hello World", body: body, userid: userid, chatid: chatid };

    return Response.json({ product });
}

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const userid = request.nextUrl.searchParams.get("userid")?.toString()

    const product = { message: "Hello World", userid: userid };

    return Response.json({ product });
}

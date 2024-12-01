export { auth as middleware } from "@/auth"
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const rateLimitMap = new Map();
const limit = process.env.RATE_LIMIT || 5

export default function rateLimitMiddleware(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") || req.ip;
    const windowMs = 60 * 1000; // 1 minute

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, {
            count: 0,
            lastReset: Date.now(),
        });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
        ipData.count = 0;
        ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
        return NextResponse.json({ message: "Too Many Requests"});
    }

    ipData.count += 1;

    return NextResponse.next()
}

export const config = {
    matcher: '/api/:chat',
}
import { auth } from "@/auth"

const publicPaths = ["/", "/about", "/about/privacy-policy", "/about/terms-of-service", "/login"]

export default auth((req) => {
    const isAuthAPI = req.nextUrl.pathname.split("/").slice(0, 3).join("/") == "/api/auth";

    let isDevApi = false

    if (process.env.NODE_ENV === "development") {
        isDevApi = req.nextUrl.pathname.split("/").slice(0, 3).join("/") == "/api/dev"
    }

    if (!req.auth && !isAuthAPI && !isDevApi && !publicPaths.includes(req.nextUrl.pathname)) {
        const newUrl = new URL("/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}

// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'

// const rateLimitMap = new Map();
// const limit = process.env.RATE_LIMIT || 5

// export default function rateLimitMiddleware(req: NextRequest) {
//     const ip = req.headers.get("x-forwarded-for") || req.ip;
//     const windowMs = 60 * 1000; // 1 minute

//     if (!rateLimitMap.has(ip)) {
//         rateLimitMap.set(ip, {
//             count: 0,
//             lastReset: Date.now(),
//         });
//     }

//     const ipData = rateLimitMap.get(ip);

//     if (Date.now() - ipData.lastReset > windowMs) {
//         ipData.count = 0;
//         ipData.lastReset = Date.now();
//     }

//     if (ipData.count >= limit) {
//         return NextResponse.json({ message: "Too Many Requests"});
//     }

//     ipData.count += 1;

//     return NextResponse.next()
// }

// export const config = {
//     matcher: '/api/:chat',
// }
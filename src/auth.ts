import NextAuth from "next-auth"
import { Session } from "next-auth"
import { NextRequest } from "next/server"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
})

// node_modules/next-auth/src/lib/index.ts
export interface NextAuthRequest extends NextRequest {
    auth: Session | null;
}
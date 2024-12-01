import NextAuth from "next-auth"
import { Session } from "next-auth"
import { NextRequest } from "next/server"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"
import Spotify from "next-auth/providers/spotify"
import Twitter from "next-auth/providers/twitter"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, Discord, GitHub, Spotify, Twitter],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
    },
})

// node_modules/next-auth/src/lib/index.ts
export interface NextAuthRequest extends NextRequest {
    auth: Session | null;
}
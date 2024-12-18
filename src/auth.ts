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
import Credentials from "next-auth/providers/credentials"
import { Provider } from "next-auth/providers"

const providers: Array<Provider> = [
    Google,
    Discord,
    GitHub,
    Spotify,
    Twitter
]

// If in development, allow the creation of dummy accounts without any authentication and arbitrary user data.
// Mostly used for E2E testing.
if (process.env.NODE_ENV == "development") {
    const cred = Credentials({
        credentials: {
            email: { label: "Email" },
            name: { label: "Name" },
            image: { label: "Image" },
        },
        authorize: async (credentials) => {
            let user = {}

            if (!credentials.email || credentials.email == "") {
                return null
            }

            // whatever the spaghetti made this work, I dunno. Don't touch this.
            user = {
                email: credentials.email,
                name: credentials.name,
                image: credentials.image
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dev/create-user`, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        email: credentials.email,
                        name: credentials.name,
                        image: credentials.image,
                    }
                }),
            })

            if (!res.ok) {
                return null
            }

            return user
        },
    })

    providers.push(cred)
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers,
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
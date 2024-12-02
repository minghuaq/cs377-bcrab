"use server"
import { signIn as authIn, signOut as authOut } from "@/auth"

export async function signIn() {
    await authIn( "", { redirectTo: "/chat" } )
}

export async function signOut() {
    await authOut( { redirectTo: "/" } )
}

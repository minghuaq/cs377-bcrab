import Link from "next/link";
import { Sparkles } from "./sparkles";
import { SignIn } from "@/components/auth/signin-button";
import { auth } from "@/auth";
import { SignOut } from "@/components/auth/signout-button";

export default async function Home() {
    const session = await auth();

    let mainButton;

    if (!session) {
        mainButton = <SignIn />;
    } else {
        mainButton = (
            <Link
                data-testid="chat-button"
                href={"/chat"}
                className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
            >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                    <span className="text-2xl">Chat</span>
                    <svg
                        fill="none"
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.75 8.75L14.25 12L10.75 15.25"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </Link>
        );
    }

    let signout;

    if (session) {
        signout = (
            <div className="px-4 py-3 justify-items-end">
                <SignOut />
            </div>
        );
    }

    return (
        <div>
            {signout}
            <div className="h-dvh w-full flex flex-col items-center justify-center overflow-hidden rounded-md gap-5">
                <Sparkles logoName="B-CRAB" />
                {mainButton}
            </div>
        </div>
    );
}

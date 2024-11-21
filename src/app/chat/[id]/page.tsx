"use client";
import Chatbox from "@/components/forms/chatbox";

export default function Home() {
    return (
        <div className="flex flex-col flex-wrap w-full h-full max-w-3xl justify-between pb-10">
            <div></div>
            <Chatbox />
        </div>
    );
}

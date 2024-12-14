"use client";

import { Message } from "ai";
import { useEffect, useRef } from "react";
import ChatBubble from "./chatbubble";

export default function ChatDialog(props: {
    chatData?: message[];
    conversation: Message[];
}) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [props.chatData, props.conversation]);
    return (
        <div className="flex flex-col h-full w-full items-center overflow-y-auto">
            <div className="flex flex-col h-full w-full max-w-3xl gap-2">
                {props.chatData?.map((message) => (
                    <div key={message.messageID}>
                        <ChatBubble
                            isAI={message.isAI}
                            message={message.message}
                        />
                    </div>
                ))}

                {props.conversation?.map((message) => (
                    <div key={message.id}>
                        <ChatBubble
                            isAI={message.role == "assistant" ? true : false}
                            message={message.content}
                        />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

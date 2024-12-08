// import { sendRequest } from "@/app/chat/actions";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import SubmitButton from "../ui/submitbutton";
import { TextBox } from "../ui/textbox";
import { Message, useChat } from "ai/react";

type chatboxProps = {
    setConversation?: React.Dispatch<React.SetStateAction<Message[]>>;
    setDialogID?: React.Dispatch<React.SetStateAction<string | null>>;
};

// async function sendRequest(dialogID: string) {
//     try {
//         let message = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${dialogID}`,
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         let messagejson = await message.json();
//         let messagelist = messagejson.messages;

//         let data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ messagelist }),
//         });

//         if (!data.ok) {
//             throw new Error(`Error: ${data.status} ${data.statusText}`);
//         }
//         let response = await data.json();
//         if (response.product.error?.code == 429) {
//             return {
//                 message:
//                     "You’ve reached our limit of messages per minute. Please try again later",
//             };
//         }

//         return { message: response.product.choices[0].delta?.content };
//     } catch (err) {
//         if (err instanceof Error) {
//             return { message: err.message };
//         } else {
//             return { message: "An unexpected error occurred" };
//         }
//     }
// }

export default function Chatbox(props: chatboxProps) {
    const chatref = useRef<HTMLParagraphElement>(null);
    const pathname = usePathname();
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const dialogID = lastPart == "chat" ? null : lastPart;
    const { messages, input, isLoading, setInput, append } = useChat();

    async function handleSubmit() {
        if (!chatref.current || chatref.current.innerHTML == "") return;
        chatref.current.innerHTML = "";

        append(
            { content: input, role: "user" },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    dialogID: dialogID,
                },
            }
        );
        setInput("");
    }
    useEffect(() => {
        props.setConversation?.(messages);
    }, [messages]);
    return (
        <form
            className="flex flex-row gap-2 items-end px-10 py-2 items-center w-full h-fit max-w-3xl"
            action={handleSubmit}
        >
            <TextBox
                className="flex flex-col w-full rounded-2xl border-4 min-h-14 h-fit justify-center outline-none outline-0"
                id="chat"
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && e.shiftKey === false) {
                        e.preventDefault();
                        document.getElementById("chatSubmitButton")?.click();
                    }
                }}
            >
                <p
                    contentEditable={"plaintext-only"}
                    suppressContentEditableWarning
                    id="default-chat"
                    data-testid="chat-input"
                    ref={chatref}
                    className="w-full h-fit max-h-52 overflow-y-auto align-middle outline-none cursor-text"
                    data-placeholder="Message B-CRAB"
                    onInput={() => {
                        const element = chatref.current;
                        if (
                            element?.innerHTML === "<br>" ||
                            element?.textContent?.trim() === ""
                        ) {
                            element.innerHTML = "";
                        }
                        setInput(element?.textContent ?? "");
                    }}
                ></p>
            </TextBox>
            <SubmitButton isLoading={isLoading} id="chatSubmitButton" />
        </form>
    );
}

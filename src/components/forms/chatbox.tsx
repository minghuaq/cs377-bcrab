import { sendRequest } from "@/app/chat/actions";
import { redirect, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import SubmitButton from "../ui/submitbutton";
import { TextBox } from "../ui/textbox";
import { useRouter } from "next/navigation";
type chatboxProps = {
    conversation?: message[];
    setConversation?: React.Dispatch<React.SetStateAction<message[]>>;
};

export default function Chatbox(props: chatboxProps) {
    const router = useRouter();

    const chatref = useRef<HTMLParagraphElement>(null);
    const userId = "test";

    const pathname = usePathname();
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const dialogID = lastPart == "chat" ? null : lastPart;

    const [userMessage, setUserMessage] = useState<string>("");
    const [aiMessage, setAIMessage] = useState<string>("");

    useEffect(() => {
        const fetchAI = async (userMessage: string) => {
            const response = await sendRequest(userMessage);
            setAIMessage(response.message);
            let retrieve = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${dialogID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: userId,
                        message: response.message,
                        isAI: true,
                    }),
                }
            );
            let dialog = await retrieve.json();
            props.setConversation?.((prev) => {
                return [
                    ...prev,
                    {
                        messageID: dialog.createMessage.messageID,
                        message: response.message,
                        isAI: true,
                    },
                ];
            });
        };
        const savedMessage = localStorage.getItem("userMessage");
        if (savedMessage) {
            setUserMessage(savedMessage);
            localStorage.removeItem("userMessage");
        }
        if (userMessage) fetchAI(userMessage);
    }, [userMessage]);

    async function handleSubmit() {
        if (!chatref.current) return;
        const message = chatref.current.textContent?.toString();
        if (!message) return;
        setUserMessage(message);
        chatref.current.innerHTML = "";
        let send = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${dialogID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: userId,
                    message: message,
                    isAI: false,
                }),
            }
        );
        let dialog = await send.json();
        props.setConversation?.((prev) => {
            return [
                ...prev,
                {
                    messageID: dialog.createMessage.messageID,
                    message: message,
                    isAI: false,
                },
            ];
        });
        let newDialogID = dialog.createMessage.dialogId;
        if (!dialogID) {
            localStorage.setItem("userMessage", JSON.stringify(message));
            router.push(`/chat/${newDialogID}`);
        }
    }
    return (
        <form
            className="flex flex-row gap-2 items-end px-10 py-2 items-center w-full h-fit"
            action={handleSubmit}
        >
            <TextBox
                className="flex flex-col w-full rounded-2xl border-4 min-h-14 h-fit justify-center outline-none outline-0"
                id="chat"
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && e.shiftKey === false) {
                        e.preventDefault();
                        document.getElementById("submitButton")?.click();
                    }
                }}
            >
                <p
                    contentEditable={"plaintext-only"}
                    suppressContentEditableWarning
                    id="default-chat"
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
                    }}
                ></p>
            </TextBox>
            <SubmitButton id="submitButton" />
        </form>
    );
}

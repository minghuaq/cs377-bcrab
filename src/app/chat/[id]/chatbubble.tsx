import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBubble(props: { message: string; isAI: boolean }) {
    return (
        <div className="">
            {props.isAI && (
                <div className={"flex flex-row"}>
                    <div className="prose prose-neutral prose-lg dark:prose-invert">
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            className={"w-full whitespace-normal"}
                        >
                            {props.message}
                        </Markdown>
                    </div>
                </div>
            )}
            {!props.isAI && (
                <div className={"flex flex-row-reverse"}>
                    <div
                        className={
                            "bg-[rgba(50,50,50,.85)] max-w-[70%] rounded-3xl px-5 py-2.5 whitespace-break-spaces"
                        }
                    >
                        {props.message}
                    </div>
                </div>
            )}
        </div>
    );
}

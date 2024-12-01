export default function ChatBubble(props: { message: string; isAI: boolean }) {
    return (
        <div className="">
            {props.isAI && (
                <div
                    className={"flex flex-row"}
                >
                    <div
                        className={"w-full"}
                    >
                        {props.message}
                    </div>
                </div>
            )}
            {!props.isAI && (
                <div
                    className={"flex flex-row-reverse"}
                >
                    <div
                        className={"bg-[rgba(50,50,50,.85)] max-w-[70%] rounded-3xl px-5 py-2.5"}
                    >
                        {props.message}
                    </div>
                </div>
            )}
        </div>
    );
}

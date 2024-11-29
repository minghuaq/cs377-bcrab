export default function ChatBubble(props: {message: string, isAI: boolean}){
    return (
        <div className={`flex ${props.isAI? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-2/5 p-2 ${props.isAI? 'bg-gray-500' : 'bg-gray-900'}`}>
                {props.message}
            </div>
        </div>
    )
}
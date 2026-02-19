import { Component } from 'solid-js';

interface MessageProps {
    userName: string;
    messageBody: string;
}

const Message: Component<MessageProps> = (props) => {
    return <div class="mx-auto rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <div>
            <div class="text-gray-500 dark:text-gray-400">{props.userName}</div>
            <p class="text-xl font-medium text-black dark:text-white">{props.messageBody}</p>
        </div>
    </div>;
}

export default Message;

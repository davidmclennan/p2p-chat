import { Component } from "solid-js";

export interface MessageProps {
  username: string;
  messageBody: string;
}

const Message: Component<MessageProps> = (props) => {
  return (
    <div class="mx-auto rounded-xl p-4 flex gap-4 hover:bg-surface">
      <img
        src="tauri.svg"
        class="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 p-2"
      />
      <div>
        <span class="text-gray-500 dark:text-gray-400 text-sm">
          {props.username}
        </span>
        <p class="text-black dark:text-white text-lg">{props.messageBody}</p>
      </div>
    </div>
  );
};

export default Message;

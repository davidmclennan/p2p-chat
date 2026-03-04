import { Component, For } from "solid-js";
import Message, { MessageProps } from "./Message";

interface MessageListProps {
  messages: Array<MessageProps>;
}

const MessageList: Component<MessageListProps> = (props) => {
  return (
    <ul class="overflow-y-auto flex-1">
      <For each={props.messages}>
        {(item) => (
          <li>
            <Message username={item.username} messageBody={item.messageBody} />
          </li>
        )}
      </For>
    </ul>
  );
};

export default MessageList;

import { Component } from 'solid-js';
 
interface MessageProps {
  messageBody: string;
}

const Message: Component<MessageProps> = (props) => {
  return <div>{props.messageBody}</div>;
}

export default Message;

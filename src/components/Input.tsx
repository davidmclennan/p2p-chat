import { Component } from "solid-js";

interface InputProps {
  text: string;
  onInput: (_value: string) => void;
}

const Input: Component<InputProps> = (props) => {
  return (
    <input
      type="text"
      placeholder="Type a message..."
      class="w-full p-4 bg-surface dark:text-white focus:outline-none"
      value={props.text}
      onInput={(e) => props.onInput(e.currentTarget.value)}
    />
  );
};

export default Input;

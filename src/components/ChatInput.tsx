import { Component, Show } from "solid-js";
import Button from "./Button";
import Input from "./Input";
import {
  IconPaperclip,
  IconMoodNeutral,
  IconSend2,
} from "@tabler/icons-solidjs";

interface ChatInputProps {
  inputText: string;
  setInputText: (_value: string) => void;
  setShowEmojiDialog: (_value: boolean) => void;
  handleSubmit: (_e: SubmitEvent) => void;
}

const ChatInput: Component<ChatInputProps> = (props) => {
  return (
    <form
      class="flex gap-2 bg-surface p-4 rounded-xl"
      onSubmit={props.handleSubmit}
    >
      <Input text={props.inputText} onInput={props.setInputText} />
      <Button type="text">
        <IconPaperclip />
      </Button>
      <Button type="text" onClick={() => props.setShowEmojiDialog(true)}>
        <IconMoodNeutral />
      </Button>
      <Show when={props.inputText}>
        <Button type="filled" submit>
          <IconSend2 />
        </Button>
      </Show>
    </form>
  );
};

export default ChatInput;

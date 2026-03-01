import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { createSignal, For, Show } from "solid-js";
import Message, { MessageProps } from "./components/Message";
import Input from "./components/Input";
import Button from "./components/Button";
import {
  IconSend2,
  IconPaperclip,
  IconMoodNeutral,
} from "@tabler/icons-solidjs";
import { EmojiPicker, Emoji } from "solid-emoji-picker";
import Dialog from "./components/Dialog";

function App() {
  const [messages, setMessages] = createSignal<Array<MessageProps>>();
  const [inputText, setInputText] = createSignal<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = createSignal<boolean>(false);

  const sendMessage = (message: MessageProps) => {
    invoke("send_message", {
      message: message,
    });
  };

  const getMessages = () => {
    invoke<Array<MessageProps>>("get_messages").then((response) =>
      setMessages(response),
    );
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!inputText()) return;

    sendMessage({
      username: "Test User",
      messageBody: inputText(),
    });

    setInputText("");
    getMessages();
  };

  const handleEmojiClick = (emoji: Emoji) => {
    setInputText(inputText() + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <main class="h-dvh bg-canvas">
      <div class="h-dvh flex flex-col p-8 gap-8">
        <ul class="flex flex-col gap-4 overflow-y-auto">
          <For each={messages()}>
            {(item) => (
              <li>
                <Message
                  username={item.username}
                  messageBody={item.messageBody}
                />
              </li>
            )}
          </For>
        </ul>
        <form
          class="flex gap-2 bg-surface p-4 rounded-xl mt-auto"
          onSubmit={handleSubmit}
        >
          <Input text={inputText()} onInput={setInputText} />
          <Button type="text">
            <IconPaperclip />
          </Button>
          <Button
            type="text"
            onClick={() => setShowEmojiPicker(!showEmojiPicker())}
          >
            <IconMoodNeutral />
          </Button>
          <Show when={inputText()}>
            <Button type="filled" submit>
              <IconSend2 />
            </Button>
          </Show>
        </form>
        <Dialog>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Dialog>
      </div>
    </main>
  );
}

export default App;

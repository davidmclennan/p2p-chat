import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { createSignal, For } from "solid-js";
import Message, { MessageProps } from "./components/Message";
import Input from "./components/Input";
import Button from "./components/Button";
import {
  IconSend2,
  IconPaperclip,
  IconMoodNeutral,
} from "@tabler/icons-solidjs";

function App() {
  const [messages, setMessages] = createSignal<Array<MessageProps>>();
  const [inputText, setInputText] = createSignal<string>("");

  const sendMessage = (message: MessageProps) => {
    invoke("send_message", {
      message: message,
    });
    setInputText("");
    getMessages();
  };

  const getMessages = () => {
    invoke<Array<MessageProps>>("get_messages").then((response) =>
      setMessages(response),
    );
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
        <div class="flex gap-2 bg-surface p-4 rounded-xl mt-auto">
          <Input text={inputText()} onInput={setInputText} />
          <Button type="text">
            <IconPaperclip />
          </Button>
          <Button type="text">
            <IconMoodNeutral />
          </Button>
          <Button
            type="filled"
            onClick={() =>
              sendMessage({ username: "User", messageBody: inputText() })
            }
          >
            <IconSend2 />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;

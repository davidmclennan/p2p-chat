import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { createSignal, createEffect, For } from "solid-js";
import Message, { MessageProps } from "./components/Message";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  const [messages, setMessages] = createSignal<Array<MessageProps>>();
  const [inputText, setInputText] = createSignal<string>("");

  createEffect(() => {
    invoke<Array<MessageProps>>('get_messages').then((response) => setMessages(response));
  });

  return (
    <main class="h-dvh p-8 bg-white dark:bg-slate-900 ">
      <ul class="flex flex-col gap-4">
        <For each={messages()}>
          {(item) =>
            <li>
              <Message username={item.username} messageBody={item.messageBody} />
            </li>
          }
        </For>
      </ul>
      <div class="flex gap-2 bg-white p-4 rounded-xl">
        <Input text={inputText()} onInput={setInputText} />
        <Button text="📎" />
        <Button text="😀" />
        <Button text="Send" />
      </div>
    </main>
  );
}

export default App;

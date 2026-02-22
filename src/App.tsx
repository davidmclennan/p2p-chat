import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { createSignal, createEffect, For } from "solid-js";
import Message, { MessageProps } from "./components/Message";

function App() {
  const [messages, setMessages] = createSignal<Array<MessageProps>>();

  createEffect(() => {
    invoke<Array<MessageProps>>('get_messages').then((response) => setMessages(response));
  });

  return (
    <main class="h-dvh p-8 bg-white dark:bg-slate-900 ">
      <For each={messages()}>
        {(item) =>
          <li>
            <Message username={item.username} messageBody={item.messageBody} />
          </li>
        }
      </For>
    </main>
  );
}

export default App;

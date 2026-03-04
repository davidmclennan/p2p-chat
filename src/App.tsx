import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { createSignal, For, Show } from "solid-js";
import Message, { MessageProps } from "./components/Message";
import Input from "./components/Input";
import Button from "./components/Button";
import {
  IconUser,
  IconFlame,
  IconSend2,
  IconPaperclip,
  IconMoodNeutral,
} from "@tabler/icons-solidjs";
import { EmojiPicker, Emoji } from "solid-emoji-picker";
import Dialog from "./components/Dialog";
import Sidebar from "./components/Sidebar";

function App() {
  const [showUserDialog, setShowUserDialog] = createSignal<boolean>(false);
  const [messages, setMessages] = createSignal<Array<MessageProps>>();
  const [inputText, setInputText] = createSignal<string>("");
  const [showEmojiDialog, setShowEmojiDialog] = createSignal<boolean>(false);

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
    setShowEmojiDialog(false);
  };

  return (
    <div class="bg-canvas flex w-screen h-screen">
      <Sidebar />
      <main class="flex flex-col flex-1">
        <div class="flex gap-4 flex-row-reverse p-4 border-b-1 border-zinc-800 mx-4">
          <Button type="text" onClick={() => setShowUserDialog(true)}>
            <IconUser />
          </Button>
          <Button type="text">
            <IconFlame />
          </Button>
        </div>
        <div class="flex flex-col p-8 gap-8">
          <ul class="overflow-y-auto">
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
            class="flex gap-2 bg-surface p-4 rounded-xl"
            onSubmit={handleSubmit}
          >
            <Input text={inputText()} onInput={setInputText} />
            <Button type="text">
              <IconPaperclip />
            </Button>
            <Button type="text" onClick={() => setShowEmojiDialog(true)}>
              <IconMoodNeutral />
            </Button>
            <Show when={inputText()}>
              <Button type="filled" submit>
                <IconSend2 />
              </Button>
            </Show>
          </form>
        </div>
      </main>
      <Dialog
        open={showUserDialog()}
        onClose={() => setShowUserDialog(false)}
        showFooter
      >
        <div class="flex flex-col gap-2 text-center">
          <p>Your user ID is:</p>
          <p class="text-2xl font-bold dark:text-white">
            <strong>fake-user-id-number</strong>
          </p>
        </div>
      </Dialog>
      <Dialog
        open={showEmojiDialog()}
        onClose={() => setShowEmojiDialog(false)}
        showFooter
      >
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Dialog>
    </div>
  );
}

export default App;

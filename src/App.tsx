import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { createSignal, onMount } from "solid-js";
import { MessageProps } from "./components/Message";
import { EmojiPicker, Emoji } from "solid-emoji-picker";
import Dialog from "./components/Dialog";
import Sidebar from "./components/Sidebar";
import ChatMenu from "./components/ChatMenu";
import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";
import { User } from "./types";

function App() {
  const [showUserDialog, setShowUserDialog] = createSignal<boolean>(false);
  const [showBurnDialog, setShowBurnDialog] = createSignal<boolean>(false);
  const [messages, setMessages] = createSignal<Array<MessageProps>>([]);
  const [inputText, setInputText] = createSignal<string>("");
  const [showEmojiDialog, setShowEmojiDialog] = createSignal<boolean>(false);
  const [user, setUser] = createSignal<User | null>(null);

  const sendMessage = (message: MessageProps) => {
    invoke("send_message", {
      message: message,
    });
  };

  const get_user = () => {
    invoke<User>("get_user").then((response) => {
      setUser(response);
    });
  };

  const getMessages = () => {
    invoke<Array<MessageProps>>("get_messages").then((response) =>
      setMessages(response),
    );
  };

  const handleBurnChat = () => {
    setMessages([]);
    setShowBurnDialog(false);
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

  onMount(async () => {
    get_user();
  });

  return (
    <div class="bg-canvas flex w-screen h-screen">
      <Sidebar />
      <main class="flex flex-col flex-1">
        <ChatMenu
          setShowUserDialog={setShowUserDialog}
          setShowBurnDialog={setShowBurnDialog}
        />
        <div class="flex flex-col flex-1 p-8 gap-8 min-h-0">
          <MessageList messages={messages()} />
          <ChatInput
            inputText={inputText()}
            setInputText={setInputText}
            setShowEmojiDialog={setShowEmojiDialog}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
      <Dialog open={showUserDialog()} onClose={() => setShowUserDialog(false)}>
        <div class="flex flex-col gap-2 text-center">
          <p>Your user ID is:</p>
          <p class="text-2xl font-bold dark:text-white">
            <strong>{user()?.id}</strong>
          </p>
        </div>
      </Dialog>
      <Dialog
        open={showBurnDialog()}
        onConfirm={handleBurnChat}
        onClose={() => setShowBurnDialog(false)}
      >
        <div class="flex flex-col gap-4">
          <p>Are you sure you want to burn this chat?</p>
          <p>All messages will be lost and the session terminated.</p>
          <div class="flex gap-2">
            <input type="checkbox" id="burn-chat-checkbox" />
            <label for="burn-chat-checkbox">Don't show again.</label>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={showEmojiDialog()}
        onClose={() => setShowEmojiDialog(false)}
      >
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Dialog>
    </div>
  );
}

export default App;

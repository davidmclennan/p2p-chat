import "./App.css";
import { invoke } from "@tauri-apps/api/core";
import { createSignal } from "solid-js";
import { MessageProps } from "./components/Message";
import { EmojiPicker, Emoji } from "solid-emoji-picker";
import Dialog from "./components/Dialog";
import Sidebar from "./components/Sidebar";
import ChatMenu from "./components/ChatMenu";
import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";

function App() {
  const [showUserDialog, setShowUserDialog] = createSignal<boolean>(false);
  const [showBurnDialog, setShowBurnDialog] = createSignal<boolean>(false);
  const [messages, setMessages] = createSignal<Array<MessageProps>>([]);
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
        open={showBurnDialog()}
        onClose={() => setShowBurnDialog(false)}
        showFooter
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
        showFooter
      >
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Dialog>
    </div>
  );
}

export default App;

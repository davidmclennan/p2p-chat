import { Component } from "solid-js";
import Button from "./Button";
import { IconUser, IconFlame } from "@tabler/icons-solidjs";

interface ChatMenuProps {
  setShowUserDialog: (_value: boolean) => void;
  setShowBurnDialog: (_value: boolean) => void;
}

const ChatMenu: Component<ChatMenuProps> = (props) => {
  return (
    <div class="flex gap-4 flex-row-reverse p-4 border-b-1 border-zinc-800 mx-4">
      <Button variant="icon_text" onClick={() => props.setShowUserDialog(true)}>
        <IconUser />
      </Button>
      <Button variant="icon_text" onClick={() => props.setShowBurnDialog(true)}>
        <IconFlame />
      </Button>
    </div>
  );
};

export default ChatMenu;

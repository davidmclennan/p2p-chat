import { Component } from "solid-js";
import Button from "./Button";
import { IconSettings } from "@tabler/icons-solidjs";

interface SidebarProps {}

const Sidebar: Component<SidebarProps> = () => {
  return (
    <aside class="w-64 p-4 bg-surface flex flex-col">
      <h2 class="dark:text-white">Online</h2>
      <p class="dark:text-gray-400">No users online.</p>
      <div class="mt-auto">
        <Button type="text">
          <IconSettings />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;

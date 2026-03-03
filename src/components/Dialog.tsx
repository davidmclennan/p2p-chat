import { ParentComponent, Show } from "solid-js";
import Button from "./Button";

interface DialogProps {
  ref: HTMLDialogElement;
  showFooter?: boolean;
}

const Dialog: ParentComponent<DialogProps> = (props) => {
  return (
    <dialog
      ref={props.ref}
      class="bg-surface rounded-xl p-8 shadow-lg max-w-lg backdrop:bg-black/50 backdrop:backdrop-blur-md dark:text-white m-auto"
    >
      <div class="overflow-y-auto max-h-80">{props.children}</div>
      <Show when={props.showFooter}>
        <footer class="flex flex-row-reverse pt-8">
          <Button type="filled" onClick={() => props.ref.close()}>
            Close
          </Button>
        </footer>
      </Show>
    </dialog>
  );
};

export default Dialog;

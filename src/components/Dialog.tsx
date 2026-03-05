import { createEffect, ParentComponent, Show } from "solid-js";
import Button from "./Button";

interface DialogProps {
  open?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

const Dialog: ParentComponent<DialogProps> = (props) => {
  let dialogRef: HTMLDialogElement | undefined;

  createEffect(() => {
    if (props.open) {
      dialogRef?.showModal();
    } else {
      dialogRef?.close();
    }
  });

  return (
    <dialog
      ref={(el) => {
        dialogRef = el;
      }}
      class="bg-surface rounded-xl p-8 shadow-lg max-w-lg backdrop:bg-black/50 backdrop:backdrop-blur-md dark:text-white m-auto"
    >
      <div class="overflow-y-auto max-h-80">{props.children}</div>
      <Show when={props.onConfirm || props.onClose}>
        <footer class="flex flex-row-reverse pt-8 gap-2">
          <Show when={props.onClose}>
            <Button variant="text" onClick={props.onClose}>
              Close
            </Button>
          </Show>
          <Show when={props.onConfirm}>
            <Button variant="text" onClick={props.onConfirm}>
              OK
            </Button>
          </Show>
        </footer>
      </Show>
    </dialog>
  );
};

export default Dialog;

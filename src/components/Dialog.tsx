import { createEffect, ParentComponent, Show } from "solid-js";
import Button from "./Button";

interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  showFooter?: boolean;
}

const Dialog: ParentComponent<DialogProps> = (props) => {
  // eslint-disable-next-line no-unassigned-vars
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
      ref={dialogRef}
      class="bg-surface rounded-xl p-8 shadow-lg max-w-lg backdrop:bg-black/50 backdrop:backdrop-blur-md dark:text-white m-auto"
    >
      <div class="overflow-y-auto max-h-80">{props.children}</div>
      <Show when={props.showFooter}>
        <footer class="flex flex-row-reverse pt-8">
          <Button type="filled" onClick={props.onClose}>
            Close
          </Button>
        </footer>
      </Show>
    </dialog>
  );
};

export default Dialog;

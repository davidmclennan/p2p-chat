import { ParentComponent } from "solid-js";

interface DialogProps {
  ref: HTMLDialogElement;
}

const Dialog: ParentComponent<DialogProps> = (props) => {
  return (
    <dialog
      ref={props.ref}
      class="bg-surface rounded-xl p-8 shadow-lg max-w-lg max-h-80 backdrop:bg-black/50 backdrop:backdrop-blur-md dark:text-white m-auto"
    >
      {props.children}
    </dialog>
  );
};

export default Dialog;

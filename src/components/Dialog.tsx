import { ParentComponent } from "solid-js";

interface DialogProps {
  ref: HTMLDialogElement;
}

const Dialog: ParentComponent<DialogProps> = (props) => {
  return (
    <dialog ref={props.ref} class="bg-surface rounded-xl p-8 dark:text-white">
      {props.children}
    </dialog>
  );
};

export default Dialog;

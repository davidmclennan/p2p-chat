import { ParentComponent } from "solid-js";

interface DialogProps {
  modal?: boolean;
}

const Dialog: ParentComponent<DialogProps> = (props) => {
  return (
    <dialog class="fixed bg-surface rounded-xl dark:text-white p-8">
      {props.children}
    </dialog>
  );
};

export default Dialog;

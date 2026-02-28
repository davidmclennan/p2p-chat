import { ParentComponent } from "solid-js";

interface ModalProps {}

const Modal: ParentComponent<ModalProps> = (props) => {
  return (
    <div class="fixed bg-surface rounded-xl w-lg h-lg dark:text-white p-8 overflow-y-auto">
      {props.children}
    </div>
  );
};

export default Modal;

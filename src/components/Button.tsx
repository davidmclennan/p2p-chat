import { ParentComponent } from "solid-js";

interface ButtonProps {
  type: "filled" | "text";
  submit?: boolean;
  onClick?: () => void;
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class={`${
        props.type === "filled"
          ? "bg-brand hover:bg-brand-darker text-white"
          : "bg-transparent text-gray-400 hover:text-gray-500"
      } font-bold py-2 px-4 rounded-full`}
      onClick={props.onClick}
      type={props.submit ? "submit" : "button"}
    >
      {props.children}
    </button>
  );
};

export default Button;

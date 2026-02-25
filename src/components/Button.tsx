import { ParentComponent } from "solid-js";

interface ButtonProps {
  type: "filled" | "text";
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class={`${props.type === "filled" ? "bg-brand-500 hover:bg-brand-700 text-white" : "bg-transparent text-brand-500 hover:text-brand-700"} font-bold py-2 px-4 rounded`}
    >
      {props.children}
    </button>
  );
};

export default Button;

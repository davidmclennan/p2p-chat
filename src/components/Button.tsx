import { ParentComponent } from "solid-js";

interface ButtonProps {
  variant: "filled" | "text" | "icon_filled" | "icon_text";
  submit?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<string, string> = {
  filled: "bg-brand hover:bg-brand-darker text-white rounded-sm",
  text: "bg-transparent text-gray-400 hover:bg-zinc-800 rounded-sm",
  icon_filled: "bg-brand hover:bg-brand-darker text-white rounded-full",
  icon_text: "bg-transparent text-gray-400 hover:bg-zinc-800 rounded-full",
};

const Button: ParentComponent<ButtonProps> = (props) => {
  const className = `${VARIANT_CLASSES[props.variant]} font-bold py-2 px-4`;

  return (
    <button
      class={className}
      onClick={props.onClick}
      type={props.submit ? "submit" : "button"}
    >
      {props.children}
    </button>
  );
};

export default Button;

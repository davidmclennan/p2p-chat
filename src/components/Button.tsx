import { ParentComponent } from "solid-js";

const Button: ParentComponent = (props) => {
  return (
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {props.children}
    </button>
  );
};

export default Button;

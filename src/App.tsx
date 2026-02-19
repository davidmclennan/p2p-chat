import "./App.css";
import Message from "./components/Message";

function App() {
  return (
    <main class="h-dvh p-8 bg-white dark:bg-slate-900 ">
      <Message userName="Fake username" messageBody="This is a message." />
    </main>
  );
}

export default App;

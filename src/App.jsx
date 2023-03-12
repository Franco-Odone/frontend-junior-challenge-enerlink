import TodoList from "./components/TodoList";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
  return (
    <>
      <div className="root">
        <TodoList />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;

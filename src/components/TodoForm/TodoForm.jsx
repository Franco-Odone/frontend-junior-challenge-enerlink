import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./todoForm.css";

const TodoForm = (props) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newToDo = {
      id: crypto.randomUUID(),
      label: input,
      checked: false,
    };
    dispatch(props.onSubmit(newToDo));
    inputRef.current.value = "";
    setInput("");
  };
  return (
    <form className="todos-form" onSubmit={handleSubmit}>
      <input
        className="todos-input"
        type="text"
        placeholder="Enter new to do..."
        name="text"
        ref={inputRef}
        onChange={handleChange}
      />
      <button className="todos-button" disabled={input === "" ? true : false}>
        Add To Do
      </button>
    </form>
  );
};

export default TodoForm;

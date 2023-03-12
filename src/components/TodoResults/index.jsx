import { useSelector } from "react-redux";
import "./styles.css";

const TodoResults = () => {
  const { todos } = useSelector((state) => state.todos);

  return (
    <div className="todo-results">{`Done: ${
      todos.filter((todo) => todo.checked === true).length
    }`}</div>
  );
};

export default TodoResults;

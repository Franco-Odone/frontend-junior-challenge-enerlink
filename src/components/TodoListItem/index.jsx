import "./styles.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const TodoListItem = ({ id, label, checked, onCheck, deleteTask }) => (
  <div className={checked ? "todo-container completed" : "todo-container"}>
    <div className="todo-text" onClick={() => onCheck(id)}>
      {label}
    </div>
    <div
      className="todo-container-icon"
      onClick={() => {
        deleteTask(id);
      }}
    >
      <AiOutlineCloseCircle className="todo-icon" />
    </div>
  </div>
);

export default TodoListItem;

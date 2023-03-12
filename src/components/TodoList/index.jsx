import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "redux/todosSlice";

import TodoListItem from "components/TodoListItem";
import TodoForm from "components/TodoForm/TodoForm";
import TodoResults from "components/TodoResults";

import { toast } from "react-toastify";
import "./styles.css";

const TodoList = () => {
  const { todos, status, error } = useSelector((state) => state.todos);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    status === "rejected" &&
      toast.error(`${error}`, {
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }, [status, error]);

  const deleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  const updateTask = (id) => {
    setCheck(!check);
    dispatch(toggleTodo(id, check));
  };

  return (
    <>
      <div className="todo-list">
        <span className="todo-list-title">Things to do:</span>
        <TodoForm onSubmit={addTodo} />
        <div className="todo-list-content">
          {todos.length !== 0 ? (
            todos
              .map((todo) => (
                <TodoListItem
                  key={todo.id}
                  id={todo.id}
                  deleteTask={deleteTask}
                  onCheck={updateTask}
                  checked={todo.checked}
                  label={todo.label}
                />
              ))
              .reverse()
          ) : (
            <p>Looks like you&apos;re absolutely free today!</p>
          )}
        </div>
      </div>
      <TodoResults />
    </>
  );
};

export default TodoList;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  status: "",
  error: "",
};

const baseURL =
  "https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(baseURL);
  return response?.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (values) => {
  const response = await axios.post(baseURL, {
    id: values.id,
    label: values.label,
    checked: values.checked,
  });
  return response?.data;
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id, value) => {
    const response = await axios.patch(`${baseURL}/${id}`, {
      checked: value,
    });
    return response?.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${baseURL}/${id}`);
  // payload
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message + " (read)";
      })
      .addCase(addTodo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = [...state.todos, action.payload];
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message + " (create)";
      })
      .addCase(toggleTodo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, checked: !todo.checked }
            : todo
        );
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message + " (update)";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message + " (delete)";
      });
  },
});

export default todosSlice.reducer;

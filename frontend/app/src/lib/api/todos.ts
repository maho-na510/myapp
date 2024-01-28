
import { TodoType } from "../../types/todo";
import client from "./client";

export const getTodos = () => {
  return client.get<TodoType[]>("/todos");
};

export const createTodo = (todo: Pick<TodoType, "title" | "completed">) => {
  return client.post("/todos", todo);
};

export const updateTodo = (id: number, todo: Pick<TodoType, "completed">) => {
  return client.put(`/todos/${id}`, todo);
};

export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};
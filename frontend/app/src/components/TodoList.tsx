import * as React from "react";
import { TodoType } from "../types/todo";
import { Checkbox, HStack, IconButton, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface TodoListProps {
  todos: TodoType[];
  onToggleTodo: (id: number, completed: boolean) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <VStack spacing={2} align="start">
      {todos.map((todo) => (
        <HStack key={todo.id}>
          <Checkbox
            isChecked={todo.completed}
            onChange={() => onToggleTodo(todo.id, todo.completed)}
            colorScheme="blue"
            size="lg"
            mr={4} // チェックボックスとアイコンの間隔を調整
          >
            {todo.title}
          </Checkbox>
          <IconButton
            aria-label="Delete todo"
            icon={<DeleteIcon />}
            onClick={() => onDeleteTodo(todo.id)}
            colorScheme="red" // 削除ボタンの色を赤に変更
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;

// src/App.tsx
import * as React from "react";
import { TodoType } from "./types/todo";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./lib/api/todos";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import Loginform from "./pages/Loginform";

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    // ログイン状態のチェック
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCreateTodo = async () => {
    const response = await createTodo({
      title: title,
      completed: false,
    });
    setTodos((prevTodos) => [...prevTodos, response.data]);
    setTitle("");
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    const response = await updateTodo(id, {
      completed: !completed,
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? response.data : todo))
    );
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <VStack spacing={4} padding={4}>
      <Heading as="h1" mb="8">
        Todoアプリ
      </Heading>
      {isLoggedIn ? (
        <React.Fragment>
          <Flex>
            <Input
              placeholder="Todoを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button colorScheme="blue" mx={4} onClick={handleCreateTodo}>
              <AddIcon />
            </Button>
          </Flex>
          {todos.map((todo) => (
            <Box
              key={todo.id}
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Checkbox
                colorScheme="blue"
                size="lg"
                isChecked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
              >
                {todo.title}
              </Checkbox>
              <DeleteIcon onClick={() => handleDeleteTodo(todo.id)} />
            </Box>
          ))}
        </React.Fragment>
      ) : (
        <Loginform />
      )}
    </VStack>
  );
};

export default App;

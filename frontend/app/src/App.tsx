import * as React from "react";
import { ChakraProvider, VStack, Flex, Heading, Button, Input } from "@chakra-ui/react";
import { TodoType } from "./types/todo";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./lib/api/todos";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import TodoList from "./components/TodoList";
import LoginForm from "./pages/LoginForm";

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    // ログイン状態のチェック
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // ログイン後にTodoリストを取得する
      fetchTodos();
    }
  }, []);

  // Todoリストを取得する関数
  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

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

  const handleLogout = () => {
    // ローカルストレージからトークンを削除し、ログイン状態を更新する
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} padding={4}>
        <Flex justify="center" align="center" w="100%">
          <Heading as="h1">Todoアプリ</Heading>
          {isLoggedIn && (
            <Button colorScheme="gray" onClick={handleLogout}>ログアウト</Button>
          )}
        </Flex>
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
            {/* TodoListコンポーネントを表示する */}
            <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
          </React.Fragment>
        ) : (
          <LoginForm />
        )}
      </VStack>
    </ChakraProvider>
  );
};

export default App;

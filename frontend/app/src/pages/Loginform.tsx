import React, { useState, useRef } from 'react';
import axios from '../lib/api/client';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Input, VStack, ChakraProvider } from '@chakra-ui/react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const leastDestructiveRef = useRef<HTMLButtonElement | null>(null); // Refオブジェクトを作成

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      const token = response.data.token;
      // ログイン成功時の処理: ローカルストレージにトークンを保存し、Todo画面にリダイレクト
      localStorage.setItem('token', token);
      window.location.href = '/todos'; // ログイン後にリダイレクトするURL
    } catch (error) {
      console.error('Login error:', error);
      setIsAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <ChakraProvider>
      <VStack spacing="4">
        <form onSubmit={handleSubmit}>
          <VStack spacing="2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワード"
            />
            <Button type="submit" colorScheme="blue" size="lg" width="100%">
              ログイン
            </Button>
          </VStack>
        </form>
      </VStack>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={leastDestructiveRef} // Refオブジェクトを渡す
        onClose={handleCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ログインエラー
            </AlertDialogHeader>
            <AlertDialogBody>
              ログインに失敗しました。メールアドレスとパスワードを確認してください。
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={leastDestructiveRef} onClick={handleCloseAlert}> {/* ボタンにRefオブジェクトを割り当て */}
                閉じる
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
};

export default LoginForm;

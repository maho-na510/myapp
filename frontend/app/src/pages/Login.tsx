import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Input } from '@chakra-ui/react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false); 
  const onClose = () => setIsOpen(false); 
  const cancelRef = React.useRef<HTMLButtonElement>(null); 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:3001/api/v1/login', { email, password });
      // ログイン成功時の処理
      navigate('/');
    } catch (error) {
      // ログイン失敗時の処理
      setIsOpen(true); 
    }
  };

  return (
    <>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ログイン失敗
            </AlertDialogHeader>
            <AlertDialogBody>
              メールアドレスまたはパスワードが間違っています。
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                閉じる
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Login;

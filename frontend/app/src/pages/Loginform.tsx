import React, { useState } from 'react';
import axios from '../lib/api/client';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    }
  };

  return (
    <div>
      <p style={{ color: 'red' }}>ログインしてください</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default LoginForm;

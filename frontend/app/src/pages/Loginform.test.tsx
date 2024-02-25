import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from '../lib/api/client'; // axiosのモックを作成するためにインポート

import LoginForm from './LoginForm';

describe('Loginform', () => {
  test('ユーザーが正しい情報を入力してフォームを送信すると、axiosが正常にPOSTリクエストを送信することを確認します', async () => {
    // axios.postのモックを作成して、呼び出しを監視します
    const axiosMock = jest.spyOn(axios, 'post');
    axiosMock.mockResolvedValue({ data: { token: 'testToken' } }); 

    // テスト対象のコンポーネントをレンダリングします
    const { getByLabelText, getByText } = render(<LoginForm />);

    // 入力フィールドに値を入力します
    fireEvent.change(getByLabelText(/メールアドレス/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/パスワード/i), { target: { value: 'password' } });

    // フォームを送信します
    fireEvent.click(getByText(/ログイン/i));

    // POSTリクエストが正常に送信されることを確認します
    await waitFor(() => expect(axiosMock).toHaveBeenCalledWith('/login', { email: 'test@example.com', password: 'password' }));
  });

  test('ユーザーが無効な情報を入力してフォームを送信すると、エラーが発生することを確認します', async () => {
    // axios.postのモックを作成して、呼び出しを監視します
    const axiosMock = jest.spyOn(axios, 'post');
    axiosMock.mockRejectedValue(new Error('Invalid credentials')); // モックの戻り値を設定

    // テスト対象のコンポーネントをレンダリングします
    const { getByLabelText, getByText } = render(<LoginForm />);

    // 入力フィールドに値を入力します
    fireEvent.change(getByLabelText(/メールアドレス/i), { target: { value: 'invalid@example.com' } });
    fireEvent.change(getByLabelText(/パスワード/i), { target: { value: 'invalidPassword' } });

    // フォームを送信します
    fireEvent.click(getByText(/ログイン/i));

    // エラーメッセージが表示されることを確認します
    await waitFor(() => expect(getByText(/無効なメールアドレスまたはパスワードです/i)).toBeInTheDocument());
  });

});

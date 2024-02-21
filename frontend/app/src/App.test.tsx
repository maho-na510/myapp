import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Todoアプリ heading', () => {
    const { getByText } = render(<App />);
    const headingElement = getByText(/Todoアプリ/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders input field and add button', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const inputElement = getByPlaceholderText(/Todoを入力/i);
    const addButton = getByText(/追加/i);
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('renders login form if not logged in', () => {
    const { getByText } = render(<App />);
    const loginForm = getByText(/ログインしてください/i);
    expect(loginForm).toBeInTheDocument();
  });

  test('adds a new todo item', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);
    const inputElement = getByPlaceholderText(/Todoを入力/i);
    const addButton = getByText(/追加/i);
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    await waitFor(() => expect(getByTestId('todo-item')).toBeInTheDocument());
  });

  test('toggles todo item completion status', async () => {
    const { getByText, getByTestId } = render(<App />);
    const todoItem = getByTestId('todo-item');
    fireEvent.click(todoItem);
    await waitFor(() => expect(todoItem).toHaveClass('completed'));
  });

  test('deletes todo item', async () => {
    const { getByText, getByTestId, queryByTestId } = render(<App />);
    const todoItem = getByTestId('todo-item');
    const deleteButton = getByText(/削除/i);
    fireEvent.click(deleteButton);
    await waitFor(() => expect(queryByTestId('todo-item')).not.toBeInTheDocument());
  });
});

import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoApp from './index.tsx';
import * as ReactQuery from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual("@tanstack/react-query");

  return {
    ...original,
    useQuery: jest.fn(),
  };
});

afterEach(() => {
	jest.resetAllMocks()
})

const queryClient = new QueryClient();
const { useQuery } = ReactQuery

test('display "loading" while data is fetching', async () => {
	(useQuery as jest.Mock).mockReturnValue({
		isPending: true,
		error: null,
		data: null
	})

	render(
        <QueryClientProvider client={queryClient}>
            <TodoApp />
		</QueryClientProvider>
	)
    
	const loading = screen.getByText(/loading.../i)
	expect(loading).toBeInTheDocument()
})

test('display error if fetching failed', async () => {
	(useQuery as jest.Mock).mockReturnValue({
		isPending: false,
		error: {message: 'error occured'},
		data: null
	})

	render(
        <QueryClientProvider client={queryClient}>
            <TodoApp />
		</QueryClientProvider>
	)

	const error = await screen.findByText(/error occured/i)
	expect(error).toBeInTheDocument()
})

test('TodoApp component should be rendered without todo list after fetching is complete, if there is no saved todo item', async () => {
	(useQuery as jest.Mock).mockReturnValue({
		isPending: false,
		error: null,
		data: null
	})

	render(
        <QueryClientProvider client={queryClient}>
            <TodoApp />
		</QueryClientProvider>
	)

	const todoApp = await screen.findByTestId('todo-app')
	expect(todoApp).toBeInTheDocument()
})

test('TodoApp component should be rendered with todo list after fetching is complete, if there is a saved todo item', async () => {
	(useQuery as jest.Mock).mockReturnValue({
		isPending: false,
		error: null,
		data: [{_id: '6476578437498234487984', itemId: '472', text: 'buy groceries', isDone: false}]
	})

	render(
        <QueryClientProvider client={queryClient}>
            <TodoApp />
		</QueryClientProvider>
	)

	const todoItem = await screen.findByText(/buy groceries/i)

	expect(todoItem).toBeInTheDocument()
})

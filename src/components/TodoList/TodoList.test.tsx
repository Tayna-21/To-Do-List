import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoList from './index.tsx';

test('TodoList component should be rendered', async () => {
	const queryClient = new QueryClient()
	
	render(
		<QueryClientProvider client={queryClient}>
	        <TodoList todos={[{_id: '6476578437498234487984', itemId: '472', text: 'buy groceries', isDone: false}]} />
		</QueryClientProvider>	
		)

	const todoList = await screen.findByRole('list')
	expect(todoList).toBeInTheDocument()
})
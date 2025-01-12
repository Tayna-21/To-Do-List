import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import DeleteAllItemsButton from './index.tsx';
import * as ReactQuery from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual("@tanstack/react-query");

  return {
    ...original,
    useMutation: jest.fn(),
  };
});

const mockMutationFn = jest.fn()
const queryClient = new QueryClient()

afterEach(() => {
	jest.resetAllMocks()
})

test('DeleteAllItemsButton component should be rendered', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <DeleteAllItemsButton />
        </QueryClientProvider>
    );

	const deleteAllItemsButton = screen.getByText(/clear all tasks/i)

	expect(deleteAllItemsButton).toBeInTheDocument()
})

test('mutation function should be called when DeleteAllItemsButton was clicked', () => {
	(useMutation as jest.Mock).mockReturnValue({
		mutate: mockMutationFn
    })
	
    render(
        <QueryClientProvider client={queryClient}>
            <DeleteAllItemsButton />
        </QueryClientProvider>
    );

	const deleteAllItemsButton = screen.getByText(/clear all tasks/i)
    
	fireEvent.click(deleteAllItemsButton)
	expect(mockMutationFn).toHaveBeenCalled()
})
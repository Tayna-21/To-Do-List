import { fireEvent, render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import Form from './index.tsx';
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

test('Form component should be rendered', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <Form />
        </QueryClientProvider>
    );

	const form = screen.getByRole('form')
	expect(form).toBeInTheDocument()

	const input = within(form).getByRole('textbox')
	expect(input).toBeInTheDocument()

	const submitButton = within(form).getByRole('button', { name: /add/i })
	expect(submitButton).toBeInTheDocument()
})

test('mutation function should be called when onSubmit event fires on Form component', () => {
	(useMutation as jest.Mock).mockReturnValue({
		mutate: mockMutationFn
    })

    render(
        <QueryClientProvider client={queryClient}>
            <Form />
        </QueryClientProvider>
    );   
    
	const form = screen.getByRole('form')
	const input = within(form).getByRole('textbox')

    fireEvent.change(input, {target: {value: 'a'}})
	fireEvent.submit(form)
	
	expect(mockMutationFn).toHaveBeenCalled()
})
import { fireEvent, render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import ListItem from './index.tsx';
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

test('ListItem component should be rendered', () => {
    render(
		<QueryClientProvider client={queryClient}>
	        <ListItem _id={'6476578437498234487984'} itemId={'472'} text={'buy groceries'} isDone={false} />
        </QueryClientProvider>
	)

	const listItem = screen.getByRole('listitem')
	expect(listItem).toBeInTheDocument()

	const checkbox = within(listItem).getByRole('checkbox')
	expect(checkbox).toBeInTheDocument()

	const paragraph = within(listItem).getByText('buy groceries')
	expect(paragraph).toBeInTheDocument()
})

test('edit-button and delete-button should be rendered when ListItem is hovered', () => {
    render(
		<QueryClientProvider client={queryClient}>
	        <ListItem _id={'6476578437498234487984'} itemId={'472'} text={'buy groceries'} isDone={false} />
        </QueryClientProvider>
	)
    
	const listItem = screen.getByRole('listitem')
	fireEvent.mouseOver(listItem)

	const buttons = within(listItem).getAllByTestId('manipulate-button')
	expect(buttons).toHaveLength(2)

	fireEvent.mouseOut(listItem)    
    const hiddenButtons = within(listItem).queryAllByTestId('manipulate-button');
    expect(hiddenButtons).toHaveLength(0);
})

test('mutation function should be called with click on delete-button', async () => {
    (useMutation as jest.Mock).mockReturnValue({
		mutate: mockMutationFn
    })

    render(
		<QueryClientProvider client={queryClient}>
	        <ListItem _id='6476578437498234487984' itemId='472' text='buy groceries' isDone={false} />
        </QueryClientProvider>
	)
    
	const listItem = screen.getByTestId('472')
	fireEvent.mouseOver(listItem)

	const buttons = within(listItem).getAllByTestId('manipulate-button')
	const deleteButton = buttons[1]

	fireEvent.click(deleteButton)
	expect(mockMutationFn).toHaveBeenCalled()
})

test('text inside todo item should be changed for input field and input should have focus when edit-button was clicked', () => {
    render(
		<QueryClientProvider client={queryClient}>
	        <ListItem _id='6476578437498234487984' itemId='472' text='buy groceries' isDone={false} />
        </QueryClientProvider>
	)
    
	const listItem = screen.getByRole('listitem')
	fireEvent.mouseOver(listItem)

	const buttons = within(listItem).getAllByTestId('manipulate-button')
	const editButton = buttons[0]

	fireEvent.click(editButton)

	const input = within(listItem).getByRole('textbox')

	expect(input).toBeInTheDocument()
	expect(input).toHaveFocus()
})

test('save-editing-button should be rendered when edit-button was clicked', async () => {
    render(
		<QueryClientProvider client={queryClient}>
	        <ListItem _id='6476578437498234487984' itemId='472' text='buy groceries' isDone={false} />
        </QueryClientProvider>
	)
    
	const listItem = screen.getByTestId('472')
	fireEvent.mouseOver(listItem)

	const buttons = within(listItem).getAllByTestId('manipulate-button')
	const editButton = buttons[0]

	fireEvent.click(editButton)
	const saveEditingButton = within(listItem).getByTestId('manipulate-button')

	expect(saveEditingButton).toBeInTheDocument()
})

test('mutation function should be called with click on save-editing-button', async () => {
    (useMutation as jest.Mock).mockReturnValue({
		mutate: mockMutationFn
    })

    render(
		<QueryClientProvider client={queryClient}>
	        <ListItem _id='6476578437498234487984' itemId='472' text='buy groceries' isDone={false} />
        </QueryClientProvider>
	)
    
	const listItem = screen.getByTestId('472')
	fireEvent.mouseOver(listItem)

	const buttons = within(listItem).getAllByTestId('manipulate-button')
	const editButton = buttons[0]

	fireEvent.click(editButton)
	const saveEditingButton = screen.getByTestId('manipulate-button')

	fireEvent.click(saveEditingButton)

	expect(mockMutationFn).toHaveBeenCalled()
})

test('mutation function should be called with click on checkbox', async () => {
    (useMutation as jest.Mock).mockReturnValue({
		mutate: mockMutationFn
    })

    render(
		<QueryClientProvider client={queryClient}>
	        <ListItem _id='6476578437498234487984' itemId='472' text='buy groceries' isDone={false} />
        </QueryClientProvider>
	)
    
	const listItem = screen.getByTestId('472')
	const checkbox = within(listItem).getByRole('checkbox')

	fireEvent.click(checkbox)

	expect(mockMutationFn).toHaveBeenCalled()
})
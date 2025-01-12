import { fireEvent, render, screen } from '@testing-library/react';
import Input from './index.tsx';

test('Input component should be rendered', () => {
	render(<Input value='' onChange={() => {}} />);

	const input = screen.getByPlaceholderText(/type here to add a task/i)
	expect(input).toBeInTheDocument()
})

test('to check if onChange event fires on Input component', () => {
    render(<Input value={'a'} onChange={() => {}} />)

	const input = screen.getByPlaceholderText(/type here to add a task/i)
	fireEvent.change(input, {target: {value: 'a'}})

	expect(input).toHaveValue('a')
})
import { render, screen } from '@testing-library/react';
import AddItemButton from './index.tsx';

test('AddItemButton should be rendered', () => {
	render(<AddItemButton />)

	const submitButton = screen.getByRole('button', { name: /add/i })
	expect(submitButton).toBeInTheDocument()
})
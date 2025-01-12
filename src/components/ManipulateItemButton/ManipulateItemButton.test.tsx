import { fireEvent, render, screen } from '@testing-library/react';
import ManipulateItemButton from './index.tsx';
import EditIcon from '../Icons/EditIcon.tsx';

test('ManipulateItemButton component should be rendered', () => {
	render(<ManipulateItemButton icon={<EditIcon />} onClick={() => {}} />)
    
	const button = screen.getByTestId('manipulate-button')

	expect(button).toBeInTheDocument()
})

test('onClick function should be called after ManipulateItemButton was clicked', () => {
	const onClick = jest.fn()

	render(<ManipulateItemButton icon={<EditIcon />} onClick={onClick} />)
    
	const button = screen.getByTestId('manipulate-button')

	fireEvent.click(button)
	expect(onClick).toHaveBeenCalled()
})
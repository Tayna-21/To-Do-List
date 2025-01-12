import React from 'react';
import styles from './deleteButton.module.scss';
import TrashIcon from '../Icons/TrashIcon';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../query-client';
import { deleteAllTodoItems } from '../../functions'

const DeleteAllItemsButton: React.FC = () => {
	const mutation = useMutation({
		mutationFn: deleteAllTodoItems,
		onSettled: () => {
			queryClient.invalidateQueries({queryKey: ['todos']})
		}
	})

	const deleteTodoList = () => {
        mutation.mutate()
	}

	return (
        <button className={styles.deleteAllItemsButton} type='button' onClick={deleteTodoList}>
			<TrashIcon />
			Clear all tasks
		</button>
	)
}

export default DeleteAllItemsButton;
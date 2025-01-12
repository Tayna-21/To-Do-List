import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../query-client.ts'
import Input from '../Input/index.tsx';
import styles from './form.module.scss'
import AddItemButton from '../AddItemButton/index.tsx';
import { InitialTodo } from '../../interfaces/index.ts';
import { createTodoItem } from '../../functions/index.ts';

const Form: React.FC = () => {
	const id = (new Date().getMilliseconds()).toString()
    const [task, setTask] = useState<InitialTodo>({
		itemId: id,
		text: '',
		isDone: false
	});

	const mutation = useMutation({
		mutationFn: createTodoItem,
		onSettled: () => {
			queryClient.invalidateQueries({queryKey: ['todos']})
			setTask({...task, itemId: id, text: ''})
		}
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTask = event.target.value

		setTask({
			...task,
			text: newTask
		})
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (task.text === '') {
				return
			} else {
                mutation.mutate(task);				
			}
	};

    return (
        <form 
		    className={styles.form}
			action='http://localhost:3001/api/todos'
			method='post'
			name='form'
			autoComplete='off'
			noValidate={true}
			onSubmit={handleSubmit}
		>
			<Input value={task.text} onChange={handleChange} />
			<AddItemButton />
		</form>
	)
}

export default Form;
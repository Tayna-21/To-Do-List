import React from 'react';
import styles from './todo.module.scss';
import Form from '../Form/index.tsx';
import TodoList from '../TodoList';
import DeleteAllItemsButton from '../DeleteAllItemsButton';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../functions';

const TodoApp: React.FC = () => {
	const {data, error, isPending} = useQuery({
		queryFn: () => fetchTodos(),
		queryKey: ['todos']
	})

	if(isPending) {
		return <span>Loading...</span>
	}
    
	if(error) {
		return <span>{error.message}</span>
	}

    return (
		<div className={styles.container} data-testid="todo-app">
			<div className={styles.appContent}>
			    <Form />
			    <div className={styles.divider}></div>
			    { (data && data.length > 0) && <div className={styles.createdItems}>
				    <div className={styles.innerContainer}>
				        <TodoList todos={ data } />
				    </div>
			    </div>}
			    { (data && data.length > 1) && <DeleteAllItemsButton /> }
			</div>
		</div>
	)
}

export default TodoApp;
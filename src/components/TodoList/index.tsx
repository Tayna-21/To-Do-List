import React from 'react';
import styles from './todoList.module.scss';
import ListItem from '../ListItem';
import { TodoListPropsTypes } from '../../interfaces';

const TodoList: React.FC<TodoListPropsTypes>= ({todos}) => {
	return (
        <ul className={styles.todoList}>
			{ todos.map((todo) => 
                 <ListItem key={todo.itemId} itemId={todo.itemId} _id={todo._id} text={todo.text} isDone={todo.isDone} />
			)}
		</ul>
	)
}

export default TodoList
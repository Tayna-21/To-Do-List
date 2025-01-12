import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ListItemPropsTypes } from '../../interfaces';
import styles from './listItem.module.scss';
import ManipulateItemButton from '../ManipulateItemButton';
import EditIcon from '../Icons/EditIcon';
import TrashIcon from '../Icons/TrashIcon';
import { queryClient } from '../../query-client';
import { updateTodo, deleteTodo } from '../../functions';
import CheckedIcon from '../Icons/CheckedIcon';

const ListItem: React.FC<ListItemPropsTypes> = ({_id, itemId, text, isDone}) => {
	const [buttonVisibleWithHover, setButtonVisibleWithHover] = useState({editButton: false, deleteButton: false});
	const [todoState, setTodoState] = useState({_id: _id, itemId: itemId, text: text, isDone: isDone});
	const [enableToEdit, setEnableToEdit] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
        if (enableToEdit && inputRef.current) {
            inputRef.current.focus()
		}
	}, [enableToEdit])

	const showManipulateButtons = () => {
		if (todoState.isDone) {
            setButtonVisibleWithHover({...buttonVisibleWithHover, editButton: false, deleteButton: true})
		} else {
            setButtonVisibleWithHover({...buttonVisibleWithHover, editButton: true, deleteButton: true});
		}
	};

	const hideManipulateButtons = () => {
		setButtonVisibleWithHover({...buttonVisibleWithHover, editButton: false, deleteButton: false})
	}

	// mark todoItem as completed/uncompleted

	const mutationCompletion = useMutation({
		mutationFn: updateTodo,
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['todos']})
            setTodoState({...todoState, isDone: !todoState.isDone})
		}
	})

	const toggleTaskCompletion = () => {
        const updatedTodo = {
			...todoState,
			isDone: !todoState.isDone
		}
       
        mutationCompletion.mutate(updatedTodo)
	}

	// edit todoItem

	const mutationUpdate = useMutation({
		mutationFn: updateTodo,
		onSettled: () => {
			queryClient.invalidateQueries({queryKey: ['todos']})
		}
	})

	const enableTodoItemEditing = () => {
		setEnableToEdit(true)
	};

	const editTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedText = event.target.value;
		
		setTodoState({...todoState, text: updatedText})
	}

	const saveUpdates = () => {
        mutationUpdate.mutate(todoState)

		setEnableToEdit(false)
	}

	// delete todoItem

	const mutationDelete = useMutation({
		mutationFn: deleteTodo,
        onSettled: () => {
			queryClient.invalidateQueries({queryKey: ['todos']})
		}
	})

	const deleteTodoItem = () => {
		mutationDelete.mutate(todoState._id)
	}

	return (
        <li className={styles.listItem} id={todoState.itemId} onMouseOver={showManipulateButtons} onMouseOut={hideManipulateButtons} data-testid={todoState.itemId}>
			<input className={styles.checkbox} type='checkbox' name='#' value='#' checked={todoState.isDone} onChange={toggleTaskCompletion}></input>
			{!enableToEdit ? 
			    <p className={styles.todoText}>{todoState.text}</p> : 
				<>
			        <input className={styles.todoText} type='text' value={todoState.text} ref={inputRef} onChange={editTodoText} onMouseOut={hideManipulateButtons} />
				    <ManipulateItemButton icon={<CheckedIcon />} onClick={saveUpdates} />
				</>
			}
			{ (buttonVisibleWithHover.editButton && !enableToEdit) && <ManipulateItemButton icon={<EditIcon />} onClick={enableTodoItemEditing} />}
			{ (buttonVisibleWithHover.deleteButton && !enableToEdit) && <ManipulateItemButton icon={<TrashIcon />} onClick={deleteTodoItem} />}
		</li>
	)
}

export default ListItem;
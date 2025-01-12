import { FetchedTodo, InitialTodo } from '../interfaces/index.ts';

export async function createTodoItem(value: InitialTodo): Promise<void> {
	const url = 'http://localhost:3001/api/todos';

	await fetch(url, {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
			itemId: value.itemId,
			text: value.text,
			isDone: value.isDone
		}),
		headers: {
			'Content-type': 'application/json'
		}
	})

	.then(response => response.json())
	.then(json => console.log(json))
}

export async function fetchTodos(): Promise<FetchedTodo[] | null> {
	try {
        const response = await fetch('http://localhost:3001/api/todos')

		if (!response.ok) {
            throw new Error()
		}

        const data = await response.json()
	    
		return data

	} catch(error) {
		if (error instanceof Error) {
            console.log(error.message)
		}

		return null
	}
}

export async function updateTodo(value: FetchedTodo): Promise<void> {
	const url = `http://localhost:3001/api/todos/${value._id}`;

	await fetch(url,{
		method: 'PATCH',
		mode: 'cors',
        body: JSON.stringify({
			_id: value._id,
			itemId: value.itemId,
            text: value.text,
			isDone: value.isDone
		}),
		headers: {
			'Content-type': 'application/json'
		}		
	})

	.then(response => response.json())
	.then(json => console.log(json))
}

export async function deleteTodo(id: string): Promise<void> {
    const url = `http://localhost:3001/api/todos/${id}`;

	await fetch(url, {
		method: 'DELETE',
		body: JSON.stringify({
			_id: id
		}),
		headers: {
			'Content-type': 'application/json'
		}		
	})

	.then(response => response.json())
	.then(json => console.log(json))
}

export async function deleteAllTodoItems(): Promise<void> {
    const url = 'http://localhost:3001/api/todos'

	await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json'
		}
	})
}
import { ReactNode } from "react";

export interface ButtonPropsTypes {
    icon: ReactNode,
    onClick: () => void
}

export interface InputPropsTypes {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InitialTodo {
    itemId: string,
    text: string,
    isDone: boolean
}

export interface FetchedTodo extends InitialTodo {
    _id: string
}

export interface ListItemPropsTypes extends FetchedTodo {}

export interface TodoListPropsTypes {
    todos: ListItemPropsTypes[]
}

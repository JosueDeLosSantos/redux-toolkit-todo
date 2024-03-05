import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { AppThunk, AppDispatch } from "../../app/store";
import { Todo } from "./types";

const initialState: Todo[] = [];
// [createSlice is] a function that accepts an initial state, an object full
//  of reducer functions, and a "slice name", and automatically generates action
//  creators and action types that correspond to the reducers and state.
const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		// Actions are strongly typed with PayloadAction,
		// so that the addTodo action only supports object of type Todo.
		addTodo(state, action: PayloadAction<Todo>) {
			// Note that within the reducer, we’re modifying state with state.push,
			// and within toggleTodo, we’re filtering for the todo to toggle,
			// and updating it directly.
			// This is possible because of Redux Toolkit’s Immer integration,
			// which sets up a proxy for the current state, making it safe to mutate.
			// Once mutations are complete, Immer handles computing the next state,
			// meaning that we can mutate our state by simplify modifying it,
			// letting Immer look after immutability.
			state.push(action.payload);
		},
		toggleTodo(state, action: PayloadAction<Todo>) {
			const todo = state.find((todo) => todo.id === action.payload.id);

			if (todo) {
				todo.completed = !todo.completed;
			}
		},
	},
});

export const { toggleTodo } = todoSlice.actions;
// The building of the Todo item has been moved out of the reducer, into a
// separate addTodo function, using AppThunk and AppDispatch; it’s essential
// to ensure that reducers must not have side effects, which means that we
// must not execute any kind of asynchronous logic, or generate random values,
// etc within.
export const addTodo =
	(text: string): AppThunk =>
	// To handle these asynchronous operations while adhering to Redux principles,
	// it's defined as a thunk, a special function that accepts the dispatch function
	// as an argument.
	async (dispatch: AppDispatch) => {
		// This allows addTodo to dispatch other actions or perform asynchronous
		// tasks within its body.
		const newTodo: Todo = {
			id: uuidv4(),
			completed: false,
			text: text,
		};

		dispatch(todoSlice.actions.addTodo(newTodo));
	};
// Since createSlice has taken care of building the reducer,
// we export it via: export default todoSlice.reducer
export default todoSlice.reducer;

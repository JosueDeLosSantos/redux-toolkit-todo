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
			id: uuidv4(), // random value
			completed: false,
			text: text,
		};

		dispatch(todoSlice.actions.addTodo(newTodo));
	};
// Since createSlice has taken care of building the reducer,
// we export it via: export default todoSlice.reducer
export default todoSlice.reducer;

/* 
Put as Much Logic as Possible in Reducers
Wherever possible, try to put as much of the logic for calculating a 
new state into the appropriate reducer, rather than in the code that 
prepares and dispatches the action (like a click handler). 
This helps ensure that more of the actual app logic is easily testable, 
enables more effective use of time-travel debugging, 
and helps avoid common mistakes that can lead to mutations and bugs.

There are valid cases where some or all of the new state should be calculated first 
(such as generating a unique ID), but that should be kept to a minimum.
 */

/* 
Organize State Structure Based on Data Types, Not Components
Root state slices should be defined and named based on the major 
data types or areas of functionality in your application, not based on 
which specific components you have in your UI. This is because there is 
not a strict 1:1 correlation between data in the Redux store and components 
in the UI, and many components may need to access the same data. 
Think of the state tree as a sort of global database that any part of the 
app can access to read just the pieces of state needed in that component.

For example, a blogging app might need to track who is logged in, 
information on authors and posts, and perhaps some info on what screen 
is active. A good state structure might look like {auth, posts, users, ui}. 
A bad structure would be something like {loginScreen, usersList, postsList}.
 */

/* 

Treat Reducers as State Machines
Many Redux reducers are written "unconditionally". 
They only look at the dispatched action and calculate a new state value, 
without basing any of the logic on what the current state might be. 
This can cause bugs, as some actions may not be "valid" conceptually 
at certain times depending on the rest of the app logic. For example, 
a "request succeeded" action should only have a new value calculated 
if the state says that it's already "loading", or an "update this item" 
action should only be dispatched if there is an item marked as "being edited".

To fix this, treat reducers as "state machines", where the combination of both 
the current state and the dispatched action determines whether a new state value 
is actually calculated, not just the action itself unconditionally.

 */

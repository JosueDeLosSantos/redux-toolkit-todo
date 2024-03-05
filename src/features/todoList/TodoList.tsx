import TodoListItem from "./TodoListItem";
import { RootState } from "../../app/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "./todoSlice";
import { VisibilityFilter } from "../../features/visibilityFilter/visibilityFilterSlice";
import { Todo } from "./types";

const getVisibleTodos = (todos: Todo[], filter: VisibilityFilter) => {
	switch (filter) {
		case VisibilityFilter.ShowAll:
			return todos;
		case VisibilityFilter.ShowCompleted:
			return todos.filter((t) => t.completed);
		case VisibilityFilter.ShowActive:
			return todos.filter((t) => !t.completed);
		default:
			throw new Error("Unknown filter: " + filter);
	}
};

export default function TodoList(): JSX.Element {
	// Dispatch is used to send action to our store .
	// It is the only way to change the state of our app.
	const dispatch = useDispatch();

	// Selectors are functions that help you extract specific data from the state.
	// It accepts the state as an argument and returns the data to retrieve from the state
	const todos = useSelector((state: RootState) =>
		getVisibleTodos(state.todos, state.visibilityFilter)
	);

	return (
		<ul>
			{todos.map((todo) => (
				<TodoListItem
					key={todo.id}
					{...todo}
					// Dispatch is used to send action to our store .
					// It is the only way to change the state of our app.
					onClick={() => dispatch(toggleTodo(todo))}
				/>
			))}
		</ul>
	);
}

/* 
Keep State Minimal and Derive Additional Values
Whenever possible, keep the actual data in the Redux store as minimal as possible, 
and derive additional values from that state as needed. This includes things like 
calculating filtered lists or summing up values. As an example, a todo app would keep 
an original list of todo objects in state, but derive a filtered list of todos outside 
the state whenever the state is updated. Similarly, a check for whether all todos have been 
completed, or number of todos remaining, can be calculated outside the store as well.

This has several benefits:

The actual state is easier to read
Less logic is needed to calculate those additional values and keep them in 
sync with the rest of the data
The original state is still there as a reference and isn't being replaced
Deriving data is often done in "selector" functions, which can encapsulate 
the logic for doing the derived data calculations. In order to improve performance, 
these selectors can be memoized to cache previous results, using libraries 
like reselect and proxy-memoize.
*/

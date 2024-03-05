import { combineReducers } from "@reduxjs/toolkit";

import todos from "../features/todoList/todoSlice";
import visibilityFilter from "../features/visibilityFilter/visibilityFilterSlice";

const rootReducer = combineReducers({
	// Name State Slices Based On the Stored Data
	// The key names in the object passed to combineReducers
	// will define the names of the keys in the resulting state object.
	// Be sure to name these keys after the data that is kept inside,
	// and avoid use of the word "reducer" in the key names.
	// Your object should look like
	// {users: {}, posts: {}}, rather than {usersReducer: {}, postsReducer: {}}.
	todos,
	visibilityFilter,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

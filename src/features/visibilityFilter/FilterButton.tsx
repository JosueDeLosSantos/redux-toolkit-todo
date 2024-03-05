import {
	setVisibilityFilter,
	VisibilityFilter,
} from "../../features/visibilityFilter/visibilityFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

interface FilterButtonProps {
	visibilityFilter: VisibilityFilter;
	text: string;
}

export default function FilterButton({ visibilityFilter, text }: FilterButtonProps) {
	const dispatch = useDispatch();

	// Selectors are functions that help you extract specific data from the state.
	// It accepts the state as an argument and returns the data to retrieve from the state.
	const currentvisibilityFilter = useSelector(
		(state: RootState) => state.visibilityFilter
	);

	return (
		<button
			disabled={currentvisibilityFilter === visibilityFilter}
			// Dispatch is used to send action to our store .
			// It is the only way to change the state of our app.
			onClick={() => dispatch(setVisibilityFilter(visibilityFilter))}
		>
			{text}
		</button>
	);
}

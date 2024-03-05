import FilterButton from "./FilterButton";

import { VisibilityFilter } from "../../features/visibilityFilter/visibilityFilterSlice";

export default function Footer() {
	return (
		<div>
			<span>Show: </span>
			<FilterButton visibilityFilter={VisibilityFilter.ShowAll} text={"All"} />
			<FilterButton
				visibilityFilter={VisibilityFilter.ShowActive}
				text={"Active"}
			/>
			<FilterButton
				visibilityFilter={VisibilityFilter.ShowCompleted}
				text={"Completed"}
			/>
		</div>
	);
}

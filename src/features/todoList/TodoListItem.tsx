interface TodoProps {
	completed: boolean;
	text: string;
	onClick: () => any;
}

function TodoListItem({ completed, text, onClick }: TodoProps) {
	return (
		<li
			onClick={onClick}
			style={{
				textDecoration: completed ? "line-through" : "none",
			}}
		>
			{text}
		</li>
	);
}

export default TodoListItem;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addTodo } from "./todoSlice";

export default function AddTodo() {
	const dispatch: AppDispatch = useDispatch();
	const [text, setText] = useState("");

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setText(e.target.value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!text.trim()) {
			return;
		}
		// Dispatch is used to send action to our store .
		// It is the only way to change the state of our app.
		dispatch(addTodo(text));

		setText("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input value={text} onChange={handleChange} />
			<button type='submit'>Add Todo</button>
		</form>
	);
}

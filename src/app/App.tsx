import AddTodo from "../features/todoList/AddTodo";
import TodoList from "../features/todoList/TodoList";
import Footer from "../features/visibilityFilter/Footer";
import "./App.css";

function App() {
	return (
		<div>
			<AddTodo />
			<TodoList />
			<Footer />
		</div>
	);
}

export default App;

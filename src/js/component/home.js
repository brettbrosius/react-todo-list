import React, { useState } from "react";

export function App() {
	let list = [];
	const [todoList, updateTodos] = useState(list);

	let addTask = e => {
		if (e.keyCode == 13) {
			let userTask = e.target.value;
			let newList = [...todoList, userTask];
			updateTodos(newList);
			e.target.value = "";
		}
	};
	let deleteTask = i => {
		let updatedList = todoList.filter((element, index) => index !== i);
		updateTodos(updatedList);
	};
	return (
		<div className="container mx-auto todoList">
			<h1 className="">To-dos</h1>
			<input
				className="form-control"
				type="text"
				name="task"
				placeholder="What needs to be done?"
				onKeyDown={addTask}
			/>
			<ul className="list-group">
				{todoList.map((todo, index) => (
					<li className="list-group-item" key={index}>
						{todo}
						<button
							id="xbutton"
							className="btn btn-light"
							onClick={() => deleteTask(index)}>
							X
						</button>
					</li>
				))}
			</ul>
			<p> {todoList.length} items left</p>
		</div>
	);
}
// let xbutton = document.getElementbyID("xbutton");
// xbutton.addEventListener("mouseover", function() {
// 	event.target.style.display = "show";
// });

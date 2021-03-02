import React, { useState, useEffect } from "react";

export function App() {
	let url = "https://assets.breatheco.de/apis/fake/todos/user/brettbrosius";

	const [todoList, updateTodos] = useState([]);

	useEffect(() => {
		fetch(url)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				updateTodos(data);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	let addTask = e => {
		if (e.keyCode == 13) {
			let newList = { label: e.target.value, done: false };
			let result = [...todoList, newList];
			updateTodos(result);
			e.target.value = "";
			fetch(url, {
				method: "PUT",
				body: JSON.stringify(result),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	let deleteTask = i => {
		let newList = todoList.filter((element, index) => index !== i);
		updateTodos(newList);
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	let clearTask = () => {
		console.log("u are " + todoList.length + " times gay");
	};

	// let saveTask = () => {
	// 	fetch(url, {
	// 		method: "PUT",
	// 		body: JSON.stringify(todoList),
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		}
	// 	})
	// 		.then(resp => {
	// 			return resp.json();
	// 		})
	// 		.then(data => {
	// 			console.log(data);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

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
						{todo.label}
						<button
							id="xbutton"
							className="btn btn-light"
							onClick={() => deleteTask(index)}>
							X
						</button>
					</li>
				))}
			</ul>
			<p>
				<strong>{todoList.length} items left</strong>
				<button
					className="btn btn-primary float-right"
					// onClick={saveTask}
				>
					Save all tasks
				</button>
				<button
					className="btn btn-danger float-right"
					onClick={clearTask}>
					Clear all tasks
				</button>
			</p>
		</div>
	);
}

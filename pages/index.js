import React, { useEffect, useState, useRef } from 'react';
import { getTodoList, getTodos } from '../common/api/http';
import { Observable, fromEvent } from 'rxjs';
import {
  catchError,
  delay,
  exhaustMap,
  filter,
  map,
  retryWhen,
  switchMap,
  take,
  tap,
	debounceTime,
	pluck,
} from 'rxjs/operators';

// function Home() {
//     return <div>Welcome to Next.js!</div>
//   }
	
const Home = () => {
	const inputRef = useRef();
	const [todos, setTodos] = useState([]);
	const [value, setValue] = useState('');
	// const observable = new Observable(subscriber => {
	// 	subscriber.fromEvent(inputRef.current);
	// })
	useEffect(() => {
		getTodoList().subscribe(res => {
			console.log(res);
		});
		getTodos().subscribe(res => {
			console.log(res);
			setTodos(res);
		});
		console.log(inputRef.current);
		const observable = fromEvent(inputRef.current, 'input').pipe(
			pluck('target', 'value'),
			debounceTime(500),
		).subscribe(res => {
			const filteredTodos = todos.filter(el => el.title.toLowerCase().includes(res));
			console.log(todos.map(el => el.title), res);
			setTodos(filteredTodos)
		});
		return () => {
			observable.unsubscribe();
		}
	}, []);

	useEffect(() => {
		// console.log(observable);
		// const s = observable
		// 	.subscribe(res => {
		// 		// setTodos(todos.filter(el => el.title.includes(res)));
		// 	})
		// return () => s.unsubscribe();
	}, [value])
	return <div>
		<input ref={inputRef} value={value} onChange={e => {
			e.preventDefault();
			setValue(e.target.value);
		}} />
		<div>
			{todos.map((el, i) => (
				<div key={i}>
					{el.title}
				</div>
			))}
		</div>
	</div>
}

export default Home
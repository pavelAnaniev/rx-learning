import React, { useEffect, useState, useRef } from 'react';
import Router from 'next/router';
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
	const [filteredTodos, setFilteredTodos] = useState([]);
	// const observable = new Observable(subscriber => {
	// 	subscriber.fromEvent(inputRef.current);
	// })
	useEffect(() => {
		const s1 = getTodoList().subscribe(res => {
		});
		const s2 = getTodos().subscribe(res => {
			setTodos(res);
			setFilteredTodos(res);
		});
		return () => {
			s1.unsubscribe();
			s2.unsubscribe();
		}
	}, []);

	useEffect(() => {
		const observable = fromEvent(inputRef.current, 'input').pipe(
			debounceTime(500),
			pluck('target', 'value'),
			filter(el => el.length > 2),
		).subscribe(res => {
			const _filteredTodos = todos.filter(el => el.title.toLowerCase().includes(res.toLowerCase()));
			setFilteredTodos(_filteredTodos)
		});
		return () => {
			observable.unsubscribe();
		}
	}, [todos]);
	return <div>
		<input ref={inputRef} value={value} onChange={e => {
			e.preventDefault();
			setValue(e.target.value);
		}} />
		<div>
			{filteredTodos.map((el, i) => (
				<div key={i}>
					{el.title}
				</div>
			))}
		</div>
	</div>
}

export default Home
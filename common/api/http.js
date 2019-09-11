import { request } from 'universal-rxjs-ajax';
import { of, merge, EMPTY, ReplaySubject } from 'rxjs';
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
} from 'rxjs/operators';

export const getTodoList = () => {
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/todo-lists',
    }).pipe(
        filter(el => el.status === 200),
        map(el => el.response),
    )
}


export const getTodos = () => {
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/todos',
    }).pipe(
        filter(el => el.status === 200),
        map(el => el.response),
    )
}
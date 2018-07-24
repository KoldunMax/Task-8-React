import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, takeLatest, call, put, select, fork, cancel } from 'redux-saga/effects';

const increment = () => ({
  type: "INCREMENT"
});

const decrement = () => ({
  type: "DECREMENT"
})

const Button = ({ onClick, value }) => <button onClick={onClick} type='button'>{value}</button>;

function counter(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT_SUCCESS':
      return state + 1
    case 'DECREMENT_SUCCESS':
      return state - 1
    default:
      return state
    }
  }

function* handleIncrement(action) {
    try {
        const getValue = yield select(state => state);
        yield call(fetch, `http//httpbin.org/delay/${getValue}`);
        yield put({
          type: 'INCREMENT_SUCCESS'
        })
    }
    catch(error) {
      yield put({
        type: 'INCREMENT_FAILED'
      })
    }
}

function* rootSaga() {
   yield all(
     [
       takeLatest('INCREMENT', handleIncrement)
     ]
   )
}

const logger = store => next => action => {
    console.group(action.type);
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result; 
}

var sagaMiddleware = createSagaMiddleware();

let store = createStore(counter, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

const render = () => {
    ReactDOM.render(
      <div>
          <p>{store.getState()}</p>
          <Button onClick={() => store.dispatch(increment())} value={'+'} />
          <Button onClick={() => store.dispatch(decrement())} value={'-'} />
      </div>
      ,document.getElementById('root')
    )
}

store.subscribe(render);

render();
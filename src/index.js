import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux'

const increment = () => ({
  type: "INCREMENT"
});

const decrement = () => ({
  type: "DECREMENT"
})

const Button = ({ onClick, value }) => <button onClick={onClick} type='button'>{value}</button>;

function counter(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
    }
  }

const logger = store => next => action => {
    let result = next(action);
    console.log("next state", store.getState());
    return result; 
}
  
let store = createStore(counter, applyMiddleware(logger));

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
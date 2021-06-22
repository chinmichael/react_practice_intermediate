import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
// import { createStore } from 'redux';

// let cart_state = [
//   { id: 0, name: "niku", quantity: 2 },
//   { id: 1, name: "addidos", quantity: 4 },
//   { id: 2, name: "guma", quantity: 3 }
// ];

// function reducer(state = cart_state, action) {

//   if (action.type === 'quanIncrese') {

//     let updatedState = [...state];
//     //let idx = updatedState.findIndex(x => { x.id == id });

//     updatedState[0].quantity++;
//     return updatedState;

//   } else if (action.type === 'quanDecrese') {

//     let updatedState = [...state];
//     if (updatedState[0].quantity > 0) {
//       updatedState[0].quantity--;
//     }
//     return updatedState;

//   } else {
//     return state;
//   }
// }

// let store = createStore(reducer);

import store from './store.js';

ReactDOM.render(
  <React.StrictMode>
    {/* <HashRouter>
      <App />
    </HashRouter> */}
    <BrowserRouter basename="">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // html의 id="root" 요소에 위 App을 넣어라
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

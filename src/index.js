import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    {/* <HashRouter>
      <App />
    </HashRouter> */}
    <BrowserRouter basename="">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // html의 id="root" 요소에 위 App을 넣어라
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

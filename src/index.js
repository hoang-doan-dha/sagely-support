import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

// The Create React App documentation states that you must prefix all environment variables 
// within your .env files with REACT_APP_ for them to be available from within your code

// WARNING: Do not store any secrets (such as private API keys) in your React app!
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common["Host"] = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['X-Sagely-Client'] = 'Website';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

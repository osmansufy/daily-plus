import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import genStore from './store/reducers'


const { store, persistor } = genStore();
const app=<Provider store={store} >
  <PersistGate loading={null} persistor={persistor}>

  
  <BrowserRouter >
<App />
</BrowserRouter>
</PersistGate>
</Provider>
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

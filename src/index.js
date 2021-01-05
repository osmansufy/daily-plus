import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware,compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import productReducer from './store/reducers/productsReducer'
import cartReducer from './store/reducers/cartReducer'
import authReducer from './store/reducers/authReducer'
import addressReducer from './store/reducers/addressReducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer,
  auth:authReducer,
  address:addressReducer,
  
});
const store=createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


const app=<Provider store={store} >
  <BrowserRouter >
<App />
</BrowserRouter>
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

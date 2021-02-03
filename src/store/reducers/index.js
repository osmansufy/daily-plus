import {createStore,applyMiddleware,compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import productReducer from './productsReducer'
import cartReducer from './cartReducer'
import authReducer from './authReducer'
import addressReducer from './addressReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['auth','carts']
  }
const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer,
  auth:authReducer,
  address:addressReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default () => {
    const store=createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
    const persistor = persistStore(store)
    return { store, persistor }
  }

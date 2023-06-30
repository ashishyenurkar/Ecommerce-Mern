import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productDetailsReducer, productReducers } from './reducers/prductReducers';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword:forgotPasswordReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
export default store;

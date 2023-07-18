import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productDetailsReducer, productReducers } from './reducers/prductReducers';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { myOrdersReducer, newOrderReducer } from './reducers/orderReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders:myOrdersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {
  // add initial state here if needed.
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],

    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
  },
 
};
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
export default store;

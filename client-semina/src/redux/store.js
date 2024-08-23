import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import { thunk } from "redux-thunk";
import authReducer from "./auth/reducer";
import categoriesReducer from "./categories/reducer";
import notificationReducer from "./notifikasi/reducer";
import talentsReducer from "./talents/reducer";
import paymentsReducer from "./payments/reducer";
import eventsReducer from "./events/reducer";
import listsReducer from "./lists/reducer";
import ordersReducer from "./orders/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  notification: notificationReducer,
  talents: talentsReducer,
  payments: paymentsReducer,
  events: eventsReducer,
  lists: listsReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

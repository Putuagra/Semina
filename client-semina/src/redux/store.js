import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import { thunk } from "redux-thunk";
import authReducer from "./auth/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

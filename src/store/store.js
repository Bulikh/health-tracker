import { createStore, applyMiddleware, compose } from "redux";
import { save, load } from "redux-localstorage-simple";

import authReducer from "./reducers/authReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(save())(createStore);
export const store = createStoreWithMiddleware(
  authReducer,
  load({
    preloadedState: {
      users: [],
    },
  }),
  composeEnhancers()
);

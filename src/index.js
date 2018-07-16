import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from 'react-redux';
import Router from "screens/router.js";
import settings from "utils/settings";
import * as reducers from "ducks";
import { composeWithDevTools } from 'redux-devtools-extension';
import "styles/main.css";

// Persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Middlewares
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import apiServiceMiddleware from 'utils/middlewares/api-service';
import promiseMiddleware from 'redux-promise-middleware';
import addSideEffectMiddleware from 'redux-reducer-side-effects';
import { reducer as uiReducer } from 'redux-ui';

const persistConfig = {
  key: settings.PERSIST_KEY,
  storage,
  whitelist: settings.PERSIST_REDUCERS,
  transforms: [createTransform(
    state => state,
    state => { //when rehydrating auth state
      if (state.initialized) {
        return {
          ...state,
          initialized: false,
        }
      };
      return state
    },
    { whitelist: ['session'] }
  )]

};
const rootReducer = combineReducers({...reducers, ui: uiReducer});
const middlewares = [thunkMiddleware, apiServiceMiddleware];
const store = createStore(persistReducer(persistConfig, rootReducer), composeWithDevTools(applyMiddleware(...middlewares)));
const persistor = persistStore(store);

const idElement = document && document.getElementById("root");

if (!idElement) {
  throw new Error("invalid type");
}

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', settings.DEBUG_BASE+':*');
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
  idElement
);

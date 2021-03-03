import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import cardsSlice from './cardsSlice'
import gameSlice from './gameSlice'
import settingsSlice from './settingsSlice';

const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    game: gameSlice.reducer,
    settings: settingsSlice.reducer
  }
})

ReactDOM.render(
   <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

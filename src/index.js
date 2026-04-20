import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import {Provider} from "react-redux"

const store = configureStore({
  reducer:rootReducer,
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    </Provider>
);
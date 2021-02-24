import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as StoreProvider } from 'react-redux';

import { createStore } from './app/store';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

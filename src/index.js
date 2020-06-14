import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import appReducers from './reducers/index';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
// Logger with default options
const store = createStore(
    appReducers,
    composeWithDevTools(applyMiddleware(logger, thunk))
  )

ReactDOM.render(
    <Provider store ={ store }>
      <App></App>
    </Provider>,
    document.getElementById('root')
 );
serviceWorker.unregister();

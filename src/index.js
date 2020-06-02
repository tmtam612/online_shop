import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import appReducers from './reducers/index';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
// Logger with default options
const store = createStore(
    appReducers,
    applyMiddleware(logger, sagaMiddleware)
  )
sagaMiddleware.run(rootSaga);
ReactDOM.render(
    <Provider store ={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
 );
serviceWorker.unregister();

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware as createRouterMiddleware, ConnectedRouter } from 'react-router-redux';

import App from './components/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const routerMiddleware = createRouterMiddleware(history);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware,
    loggerMiddleware
  )
);

render( 
  <Provider store={store}>
    {/*<ConnectedRouter history={history}>*/}
      <App />
    {/*</ConnectedRouter>*/}
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

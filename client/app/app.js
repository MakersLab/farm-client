import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import createSagaMiddlevar from 'redux-saga';

import reducer from './reducers';
import App from './containers/app';
import wsSagas from './sagas';

const sagaMiddleware = createSagaMiddlevar();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App);

sagaMiddleware.run(wsSagas);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    render(App);
  });
}

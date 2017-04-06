import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import reducer from './reducers';

import App from './containers/app';

let store = createStore(reducer);

const render = (Component) => {

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    render(App);
  });
}

import 'babel-polyfill';

import { eventChannel } from 'redux-saga';
import { put, takeEvery, call, take } from 'redux-saga/effects';
import _ from 'lodash';

import { WEBSOCKET_URL, API_URL } from '../lib/config';
import { APP_FETCH_CONFIG, test } from '../actions/app';
import { addPrinter, updatePrinterState } from '../actions/mainView';
import request from '../lib/request';

function initWebsocket() {
  const returnThis = eventChannel((emitter) => {
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onopen = () => {
    };
    ws.onerror = (error) => {
      console.log(`WebSocket error ${error}`);
    };
    ws.onmessage = (e) => {
      let msg = null;
      try {
        msg = JSON.parse(e.data);
      } catch (error) {
        console.error(`Error parsing : ${error.data}`);
      }
      if (msg) {
        return emitter(updatePrinterState(msg));
      }
    };
    // unsubscribe function
    return () => {
    };
  });
  return returnThis;
}

function loadConfig() {
  return fetch(`${API_URL}/api/printer-config`)
    .then(response => {
      return response.json()
    })
    .catch(error => {
      throw error;
    })
}

function* makeRequest() {
  const data = yield call(loadConfig);
  let actions = _.map(data.printers, (data, key) => {
    return addPrinter(data.name, key, data.url);
  });
  for (let i = 0; i < actions.length; i++) {
    yield put(actions[i])
  }
}

function* watchFetchConfig() {
  yield takeEvery(APP_FETCH_CONFIG, makeRequest);
}

function* wsSagas() {
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* rootSaga() {
  yield [
    wsSagas(),
    watchFetchConfig(),
  ]
}

import request from 'request';
import { API_URL } from './config';

const sendRequest = (method, uri, data, baseUrl, cb) => {
  let requestObject = {
    baseUrl: baseUrl || API_URL,
    method,
    uri,
    json: true,
    crossDomain: true,
  };
  if (data) {
    if (method === 'GET') {
      requestObject.qs = data;
    } else {
      requestObject.data = data;
    }
  }
  request(requestObject, (error, response, body) => {
    cb(error, body);
  });
};

export default {
  sendRequest,
};

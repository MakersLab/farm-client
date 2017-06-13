import { API_URL } from './config';
import { forEach } from 'lodash';

const sendRequest = (url, method, body) => {
  let data = new FormData();
  forEach(body, (value, key) => {
    data.append(key, value);
  });

  return fetch(`${API_URL}${url}`, {
    method,
    body: data,
  })
  .then((value) => {
    return value.text();
  })
  .catch(() => {
    console.log('error');
  });
};

const sendFile = (url, method, file, body) => {
  const form = new FormData();
  form.append('file', file[0]);
  forEach(body, (value, key) => {
    form.append(key, value);
  });

  return fetch(`${API_URL}${url}`, {
    method,
    body: form,
  })
  .then(value => (value.text()));
};

export default {
  sendRequest,
  sendFile,
};

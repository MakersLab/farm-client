
export const APP_TEST = 'TEST';
export const APP_CREATE_WEBSOCKET_CONNECTION = 'CREATE_WEBSOCKET_CONNECTION';
export const APP_FETCH_CONFIG = 'FETCH_CONFIG';


export const test = text => ({
  type: APP_TEST,
  text,
});

export const createWebsocketConnection = () => {
  return {
    type: APP_CREATE_WEBSOCKET_CONNECTION,
  };
};

export const fetchConfig = () => ({
  type: APP_FETCH_CONFIG,
});

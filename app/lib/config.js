// export const REMOTE_BASE = `http://${window.location.hostname}`;
// export const WEBSOCKET_BASE = `ws://${window.location.hostname}`;
export const REMOTE_BASE = `http://localhost`;
export const WEBSOCKET_BASE = `ws://localhost`;

export const API_PORT = '8000';
export const WEBSOCKET_PORT = '8001';
export const WEBSOCKET_PATH = '/websocket';
export const WEBSOCKET_URL = `${WEBSOCKET_BASE}:${WEBSOCKET_PORT}${WEBSOCKET_PATH}`;

export const API_URL = `${REMOTE_BASE}:${API_PORT}`;

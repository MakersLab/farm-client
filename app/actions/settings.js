export const SETTINGS_ACTIVE = 'SETTINGS_ACTIVE';
export const SETTINGS_ACTION_START = 'SETTINGS_ACTION_START';
export const SETTINGS_ACTION_FINISHED = 'SETTINGS_ACTION_FINISHED';

export const SETTINGS_SHUTDOWN_PRINTERS = 'SETTINGS_SHUTDOWN_PRINTERS';
export const SETTINGS_SHUTDOWN_FARM = 'SETTINGS_SHUTDOWN_FARM';

export const settingsActive = state => ({
  type: SETTINGS_ACTIVE,
  state,
});

export const settingsActionStart = (message, onConfirm) => ({
  type: SETTINGS_ACTION_START,
  onConfirm,
  message,
});

export const settingsActionFinish = () => ({
  type: SETTINGS_ACTION_FINISHED,
});

export const settingsShutdownPrinters = (printers) => ({
  type: SETTINGS_SHUTDOWN_PRINTERS,
  printers,
});

export const settingsShutdownFarm = () => ({
  type: SETTINGS_SHUTDOWN_FARM,
});

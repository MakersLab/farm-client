import { connect } from 'react-redux';

import Settings from '../components/settings/index';
import { settingsActive, settingsActionStart, settingsActionFinish } from '../actions/settings';

const mapStateToProps = state => ({
  active: state.settings.active,
  settings: state.settings.settings,
  prompt: state.settings.prompt,
  printers: Object.keys(state.printer.printers),
});

const mapDispatchToProps = dispatch => ({
  settingsActive: (state) => { dispatch(settingsActive(state)); },
  settingsActionStart: (message, onConfirm) => { dispatch(settingsActionStart(message, onConfirm)); },
  settingsActionFinish: () => { dispatch(settingsActionFinish()); },
});

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

export default SettingsContainer;

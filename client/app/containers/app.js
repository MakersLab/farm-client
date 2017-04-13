import { connect } from 'react-redux';

import MainApp from '../components/app';

import { fetchConfig } from '../actions/app';

const mapStateToProps = (state) => {
  return {
    text: state.app.text,
  };
};

const mapDispatchToProps = dispatch => ({
  onButtonClick: () => {
    dispatch(fetchConfig());
  },
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainApp);

export default App;

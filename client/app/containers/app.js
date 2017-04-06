import { connect } from 'react-redux';

import MainApp from '../components/app';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    text: state.app.text,
  };
};

const mapDispatchToProps = state => ({

});

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainApp);

export default App;

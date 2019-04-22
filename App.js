import React from 'react';
import { Provider } from 'react-redux';

import Navigation from './navigation/Navigation';
import store from './store/configureStore';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

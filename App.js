import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { persistGate, PersistGate } from 'redux-persist/es/integration/react';

import Navigation from './navigation/Navigation';
import store from './store/configureStore';

export default class App extends React.Component {
  render() {
    let persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

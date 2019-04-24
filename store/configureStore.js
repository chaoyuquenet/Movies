import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import toggleFavorite from './reducers/favoriteReducer';

const rootPesistConfig = {
  key: 'root',
  storage: storage
};

export default createStore(
  persistCombineReducers(rootPesistConfig, toggleFavorite)
);

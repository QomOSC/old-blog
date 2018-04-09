import { combineReducers } from 'redux';

import articles from './articles';
import user from './user';

export default combineReducers({
  articles,
  user
});

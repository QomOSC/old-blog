import { combineReducers } from 'redux';

import articles from './articles';
import users from './users';
import user from './user';

export default combineReducers({
  articles,
  users,
  user
});

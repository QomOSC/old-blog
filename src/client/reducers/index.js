import { combineReducers } from 'redux';

import conferences from './conferences';
import articles from './articles';
import comments from './comments';
import users from './users';
import user from './user';

export default combineReducers({
  conferences,
  articles,
  comments,
  users,
  user
});

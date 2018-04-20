import { combineReducers } from 'redux';

import conferences from './conferences';
import articles from './articles';
import comments from './comments';
import article from './article';
import users from './users';
import user from './user';

export default combineReducers({
  conferences,
  articles,
  comments,
  article,
  users,
  user
});

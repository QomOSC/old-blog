import { combineReducers } from 'redux';

import captcha from './captcha';
import user from './user';

export default combineReducers({
  captcha,
  user
});

import { dispatch } from 'Root/store';
import types from 'Root/actions';

import send from 'Root/js/send';

export default () => new Promise(async resolve => {
  const { type, user } = await send('/checklogin');

  if (type === 0) {
    dispatch({
      type: types.user.LOGIN,
      user
    });
  }

  resolve();
});

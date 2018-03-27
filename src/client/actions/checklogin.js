import { dispatch } from 'Root/store';
import types from 'Root/actions';

import send from 'Root/js/send';

export default () => new Promise(async resolve => {
  const request = await send('/checklogin');

  if (request.type === 0) {
    dispatch({
      type: types.user.LOGIN,
      user: request.user
    });

    resolve();
  }
});

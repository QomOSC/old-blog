import { dispatch } from 'Root/store';
import types from 'Root/actions';

import send from 'Root/js/send';

export default async () => {
  const request = await send('/checklogin');

  console.log(request);

  if (request.type === 0) {
    dispatch({
      type: types.user.LOGIN,
      user: request.user
    });
  }
};

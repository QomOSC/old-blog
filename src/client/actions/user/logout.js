import { dispatch } from 'Root/store';
import types from 'Root/actions';

import send from 'Root/js/send';

export default async () => {
  const request = await send('/panel/logout');

  if (request.type === 0) {
    dispatch({
      type: types.user.LOGOUT
    });

    // push('/');
  }
};

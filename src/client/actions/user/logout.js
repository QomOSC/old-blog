import types from 'Root/actions';

import send from 'Root/js/send';

export default push => async dispatch => {
  const request = await send('/panel/logout');

  if (request.type === 0) {
    dispatch({
      type: types.user.LOGOUT
    });

    push('/');
  }
};

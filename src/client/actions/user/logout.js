import types from 'Root/actions';

import send from 'Root/js/send';

export default push => async dispatch => {
  const { type } = await send('/panel/logout');

  if (type === 0) {
    dispatch({
      type: types.user.LOGOUT
    });

    push('/');
  }
};

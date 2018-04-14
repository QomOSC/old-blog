import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default push => async dispatch => {
  const request = await send('/panel/user/setting/delete');

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'حساب شما با موفقیت حذف شد'
    });

    dispatch({
      type: types.user.DELETE
    });

    push('/');
  }

  else {
    error();
  }
};

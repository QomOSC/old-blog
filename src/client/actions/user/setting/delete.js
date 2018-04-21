import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default push => async dispatch => {
  const { type } = await send('/panel/user/setting/delete');

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'حساب شما با موفقیت حذف شد'
    });

    dispatch({
      type: types.user.DELETE
    });

    push('/');

    return;
  }

  error();
};

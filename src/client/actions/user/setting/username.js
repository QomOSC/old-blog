import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default username => async dispatch => {
  const { type, text } =
    await send('/panel/user/setting/username', { username });

  if (type === 0) {
    dispatch({
      type: types.user.CHANGE_USERNAME,
      username
    });

    izitoast.success({
      rtl: true,
      title: 'با موفقیت به روز رسانی شد'
    });
  }

  else if (type === 2) {

    if (text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین حسابی وجود ندارد'
      });
    }

    else if (text === 1) {
      izitoast.error({
        rtl: true,
        title: 'این یوزرنیم توسط حساب دیگری استفاده میشود'
      });
    }

    else if (text === 2) {
      error();
    }
  }
};

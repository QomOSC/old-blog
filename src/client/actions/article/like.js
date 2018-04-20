import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default _id => async dispatch => {
  const { type } = await send('/article/like', { _id });

  if (type === 3) {
    izitoast.warning({
      rtl: true,
      title: 'برای لایک کردن باید وارد شوید'
    });
  }

  else if (type === 2) {
    error();
  }

  else if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله با موفقیت لایک شد'
    });

    dispatch({
      type: types.article.LIKE
    });
  }
};

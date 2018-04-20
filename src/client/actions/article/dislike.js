import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default _id => async dispatch => {
  const { type } = await send('/article/dislike', { _id });

  if (type === 3) {
    izitoast.warning({
      rtl: true,
      title: 'برای این کار باید وارد شوید'
    });
  }

  else if (type === 2) {
    error();
  }

  else if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'لایک با موفقیت برداشته شد'
    });

    dispatch({
      type: types.article.DISLIKE
    });
  }
};

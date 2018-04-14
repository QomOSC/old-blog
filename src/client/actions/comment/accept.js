import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default _id => async dispatch => {
  const request = await send('/article/comment/accept', { _id });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'نظر با موفقیت ثبت شد'
    });

    dispatch({
      type: types.comments.DROP,
      _id
    });
  }

  else if (request.type === 2) {
    error();
  }
};

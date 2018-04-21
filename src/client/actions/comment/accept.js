import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default (_id, answer) => async dispatch => {
  const { type } = await send('/article/comment/accept', { _id, answer });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'نظر با موفقیت ثبت شد'
    });

    dispatch({
      type: types.comments.DROP,
      _id
    });

    return;
  }

  error();
};

import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';

export default _id => async dispatch => {
  const { type } = await send('/panel/conferences/done', { _id });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'کنفرانس با موفقیت به اتمام رسید'
    });

    dispatch({
      type: types.conferences.DONE,
      _id
    });

    return;
  }

  error();
};

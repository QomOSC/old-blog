import izitoast from 'izitoast';

import types from 'Root/actions';

import { error } from 'Root/js/messages';
import send from 'Root/js/send';


export default _id => async dispatch => {
  const request = await send('/panel/manage/reject', { _id });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت حذف شد'
    });

    dispatch({
      type: types.users.DROP,
      _id
    });
  }

  else if (request.type === 2) {
    error();
  }
};

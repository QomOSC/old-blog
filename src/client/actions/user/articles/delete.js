import izitoast from 'izitoast';

import { error } from 'Root/js/messages';
import types from 'Root/actions';
import send from 'Root/js/send';

export default id => async dispatch => {
  const { type } = await send('/panel/articles/delete', { id });

  if (type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله با موفقیت حذف شد'
    });

    dispatch({
      type: types.articles.DELETE,
      id
    });

    return;
  }

  error();
};

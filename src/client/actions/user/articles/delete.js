import izitoast from 'izitoast';

import types from 'Root/actions';
import send from 'Root/js/send';

export default id => async dispatch => {
  const request = await send('/panel/articles/delete', { id });
  
  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'مقاله با موفقیت حذف شد'
    });

    dispatch({
      type: types.articles.DELETE,
      id
    });
  }

  else {
    izitoast.error({
      rtl: true,
      title: 'خطا! بعدا امتحان کنید'
    });
  }
};

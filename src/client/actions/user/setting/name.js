import izitoast from 'izitoast';

import types from 'Root/actions';

import send from 'Root/js/send';

export default name => async dispatch => {
  const request = await send('/panel/user/setting/name', { name });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت به روز رسانی شد'
    });

    dispatch({
      type: types.user.CHANGE_NAME,
      name
    });
  }
};

import izitoast from 'izitoast';

import types from 'Root/actions';

import send from 'Root/js/send';

export default () => async dispatch => {
  const request = await send('/panel/user/setting/avatar/remove');

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت حذف شد'
    });

    dispatch({
      type: types.user.REMOVE_AVATAR
    });
  }
};

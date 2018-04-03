import izitoast from 'izitoast';

import types from 'Root/actions';

import send from 'Root/js/send';

export default avatar => async dispatch => {
  const request = await send(
    '/panel/user/setting/avatar/update',
    { avatar },
    'formData'
  );

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت حذف شذ'
    });

    dispatch({
      type: types.user.UPDATE_AVATAR,
      avatar: request.avatar
    });
  }
};

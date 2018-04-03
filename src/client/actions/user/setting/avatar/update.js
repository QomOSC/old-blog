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
      title: 'با موفقیت تغییر کرد'
    });

    dispatch({
      type: types.user.UPDATE_AVATAR,
      avatar: request.avatar
    });
  }

  else if (request.type === 2) {
    izitoast.error({
      rtl: true,
      title: 'خطا! بعدا امتحان کنید'
    });
  }
};

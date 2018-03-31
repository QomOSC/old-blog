import izitoast from 'izitoast';

import types from 'Root/actions';

import send from 'Root/js/send';

export default username => async dispatch => {
  const request = await send('/panel/user/setting/username', { username });

  if (request.type === 0) {
    dispatch({
      type: types.user.CHANGE_USERNAME,
      username
    });

    izitoast.success({
      rtl: true,
      title: 'با موفقیت به روز رسانی شد'
    });
  }

  else if (request.type === 2) {

    if (request.text === 0) {
      izitoast.error({
        rtl: true,
        title: 'چنین حسابی وجود ندارد'
      });
    }

    else if (request.text === 1) {
      izitoast.error({
        rtl: true,
        title: 'این یوزرنیم توسط حساب دیگری استفاده میشود'
      });
    }

    else if (request.text === 2) {
      izitoast.error({
        rtl: true,
        title: 'خطا! بعدا امتحان کنید'
      });
    }
  }
};

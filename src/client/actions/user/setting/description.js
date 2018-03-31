import izitoast from 'izitoast';

import types from 'Root/actions';

import send from 'Root/js/send';

export default description => async dispatch => {
  const request = await send('/panel/user/setting/description', {
    description
  });

  if (request.type === 0) {
    izitoast.success({
      rtl: true,
      title: 'با موفقیت به روز رسانی شد'
    });

    dispatch({
      type: types.user.CHANGE_DESCRIPTION,
      description
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
        title: 'این ایمیل توسط حساب دیگری استفاده میشود'
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

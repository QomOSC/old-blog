document.forms['unsub-form'].addEventListener('submit', e => {
  send({ url: '/unsubscribe' }, e, {
    email: e.target.email.value,
    captcha: e.target.captcha.value
  }).then(res => {
    if (res.type === 0) {
      iziToast.success({
        rtl: true,
        title: 'موفق',
        message: 'لینک خروج از خبر نامه به ایمیل شما ارسال گردید'
      });
    } else if (res.type === 2) {
      if (data.text === 0) {
        iziToast.error({
          rtl: 'true',
          title: 'خطا',
          message: 'کد امنیتی اشتباه است'
        });
      } else if (res.text === 1) {
        iziToast.warning({
          rtl: 'true',
          title: 'اوپس',
          message: 'کاربر در خبرنامه عضو نیست'
        });
      } else if (res.text === 2) {
        iziErr();
      }
    }
  }).catch(() => iziErr());
});

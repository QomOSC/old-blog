const unsub = document.forms['unsub-form'];

unsub.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(unsub.email.value)) {
    fetch('/unsubscribe', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accpet': 'application/json'
      }),
      body: JSON.stringify({
        email: unsub.email.value,
        captcha: unsub.captcha.value
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'موفق',
          message: 'لینک خروج از خبر نامه به ایمیل شما ارسال گردید'
        });
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziToast.error({
            rtl: 'true',
            title: 'خطا',
            message: 'کد امنیتی اشتباه است'
          });
        } else if (data.text === 1) {
          iziToast.warning({
            rtl: 'true',
            title: 'اوپس',
            message: 'کاربر در خبرنامه عضو نیست'
          });
        } else if (data.text === 2) {
          iziToast.error({
            rtl: 'true',
            title: 'خطا',
            message: 'مشکلی پیش آمده، بعدا امتحان کنید'
          });
        }
      }
    }).catch(() => {
      iziToast.error({
        rtl: 'true',
        title: 'خطا',
        message: 'مشکلی پیش آمده، بعدا امتحان کنید'
      });
    });
  } else {
    iziToast.warning({
      rtl: 'true',
      title: 'خطا!',
      message: 'ایمیل معتبر نیست'
    });
  }
});

fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  document.getElementById('svg-captcha').innerHTML = data.captcha;
});

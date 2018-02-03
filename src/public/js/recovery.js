const rec = document.forms['recovery-form'];

rec.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(rec.email.value)) {
    fetch('/recovery', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accpet': 'application/json'
      }),
      body: JSON.stringify({
        email: rec.email.value,
        captcha: rec.captcha.value
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      console.log(data);
      if (data.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'موفق',
          message: 'لینک تغییر رمز به ایمیل شما فرستاده شد'
        });
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziToast.error({
            rtl: 'true',
            title: 'خطا',
            message: 'مقادیر را کامل کنید'
          });
        } else if (data.text === 1) {
          iziToast.error({
            rtl: 'true',
            title: 'اوپس',
            message: 'کد امنیتی اشتباه است'
          });
        } else if (data.text === 2) {
          iziErr();
        } else if (data.text === 3) {
          iziToast.error({
            rtl: 'true',
            title: 'خطا',
            message: 'ایمیل یافت نشد'
          });
        }
      }
    }).catch(() => {
      iziErr();
    });
  } else {
    iziToast.warning({
      rtl: 'true',
      title: 'خطا!',
      message: 'ایمیل معتبر نیست'
    });
    rec.email.select();
  }
});

fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  document.getElementById('svg-captcha').innerHTML = data.captcha;
});

const mainSetting = document.forms['signup-form'];

mainSetting.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(mainSetting.email.value)) {

    if (validateUsername(mainSetting.username.value)) {

      if (mainSetting.password.value.length >= 8) {

        fetch('/signup', {
          method: 'POST',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            fname: mainSetting.fname.value,
            lname: mainSetting.lname.value,
            username: mainSetting.username.value,
            email: mainSetting.email.value,
            password: mainSetting.password.value,
            captcha: mainSetting.captcha.value
          })
        }).then(checkStatus).then(res => res.json()).then(data => {
          console.log(data);
          if (data.type === 2) {
            if (data.text === 0) {
              iziToast.error({
                title: 'خطا!',
                rtl: true,
                message: 'ایمیل توسط شخص دیگری گرفته شده'
              });
              mainSetting.email.select();
            } else if (data.text === 1) {
              iziToast.error({
                title: 'خطا!',
                rtl: true,
                message: 'موارد ضروری مقدار دهی نشده اند'
              });
            } else if (data.text === 2) {
                iziToast.error({
                  title: 'خطا!',
                  rtl: true,
                  message: 'مشکلی پیش آمده، بعدا امتحان کنید'
                });
            } else if (data.text === 3) {
              iziToast.error({
                title: 'خطا!',
                rtl: true,
                message: 'یوزرنیم توسط شخص دیگری گرفته شده'
              });
              mainSetting.username.select();
            } else if (data.text === 4) {
              iziToast.error({
                title: 'خطا!',
                rtl: true,
                message: 'ایمیل توسط شخص دیگری گرفته شده است'
              });
              mainSetting.email.select();
            } else if (data.text === 5) {
              iziToast.error({
                title: 'خطا!',
                rtl: true,
                message: 'کد امنیتی اشتباه است'
              });
              mainSetting.captcha.select();
            }
          } else if (data.type === 0) {
            iziToast.success({
              title: 'موفق',
              rtl: true,
              message: 'حساب شما با موفقیت ساخته شد'
            });
          }
        }).catch(() => {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'مشکلی پیش آمده، بعدا امتحان کنید'
          });
        });

    } else {
      iziToast.warning({
        title: 'هشدار',
        rtl: true,
        message: 'رمز باید حداقل هشت رقم باشد'
      });
      mainSetting.password.select();
    }
    } else {
      iziToast.warning({
        title: 'هشدار',
        rtl: true,
        message: 'یوزرنیم وارد شده اشتباه است'
      });
      mainSetting.username.select();
    }
  } else {
    iziToast.warning({
      title: 'هشدار',
      rtl: true,
      message: 'ایمیل وارد شده اشتباه است'
    });
    mainSetting.email.select();
  }
});

fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  document.getElementById('svg-captcha').innerHTML = data.captcha;
});

const mainSetting = document.forms['signup-form'];

mainSetting.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(mainSetting.email.value)) {

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
        password: mainSetting.password.value
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
        } else if (data.text === 4) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'اییمل توسط شخص دیگری گرفته شده است'
          });
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
      message: 'ایمیل وارد شده اشتباه است'
    });
  }
});

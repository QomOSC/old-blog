const n = document.forms['newsletter-form'];

n.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(n.email.value)) {
    fetch(n.getAttribute('action'), {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        email: n.email.value.toLowerCase()
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        if (data.text === 0) {
          iziToast.success({
            rtl: true,
            title: 'موفق',
            message: 'این ایمیل در خبر نامه بوده از قبل'
          });
        } else if (data.text === 1) {
          iziToast.success({
            rtl: true,
            title: 'موفق',
            message: 'ایمیل به خبر نامه اضافه شد'
          });
        }
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziToast.error({
            rtl: true,
            title: 'خطا',
            message: 'مشکلی پیش آمده، بعدا امتحان کنید'
          });
        } else if (data.text === 1) {
          iziToast.error({
            rtl: true,
            title: 'خطا',
            message: 'ایمیل وارد شده اشتباه است'
          });
        }
      }
    }).catch(() => {
      iziToast.error({
        rtl: true,
        title: 'خطا',
        message: 'مشکلی پیش آمده، بعدا امتحان کنید'
      });      
    });
  } else {
    iziToast.warning({
      rtl: true,
      title: 'خطا',
      message: 'اییمل وارد شده معتبر نمیباشد'
    });
    n.email.select();
  }
});

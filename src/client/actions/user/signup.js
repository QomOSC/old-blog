import izitoast from 'izitoast';

export default (data, push) => {
  fetch('/signup', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify({
      ...data
    })
  }).then(res => res.json()).then(res => {
    if (res.type === 2) {

      if (res.text === 1) {
        izitoast.error({
          rtl: true,
          title: 'ایمیل توسط کاربر دیگری استفاده میشود'
        });
      }

      else if (res.text === 2) {
        izitoast.error({
          rtl: true,
          title: 'یوزرنیم توسط کاربر دیگری استفاده میشود'
        });
      }

      else if (res.text === 3) {
        izitoast.error({
          rtl: true,
          title: 'خطا! بعدا امتحان کنید'
        });
      }
    }

    else if (res.type === 0) {
      izitoast.success({
        rtl: true,
        title: 'حساب شما با موفقیت ساخته شد، تا زمان تایید آن صبر کنید'
      });

      push('/');
    }
  });
};

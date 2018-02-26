function iziErr() {
  iziToast.error({
    title: 'خطا!',
    rtl: true,
    message: 'مشکلی پیش آمده، بعدا امتحان کنید'
  });
}

function getQuery(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');

    let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);

    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ''));
}

if (document.getElementById('change-captcha')) {
  document
    .getElementById('change-captcha')
    .addEventListener('click', () => {
      fetch('/captcha', {
        credentials: 'include'
      }).then(checkStatus).then(res => res.json()).then(data => {
        document.getElementById('svg-captcha').innerHTML = data.captcha;
      });
  });
}

if (document.getElementById('svg-captcha')) {
  fetch('/captcha', {
    credentials: 'include'
  }).then(checkStatus).then(res => res.json()).then(data => {
    document.getElementById('svg-captcha').innerHTML = data.captcha;
  });
}

function send(target, e, data = {}) {
  return new Promise((resolve, reject) => {

    e.preventDefault();

    if (data.email) {
      if (!validateEmail(data.email)) {
        iziToast.warning({
          rtl: true,
          title: 'هشدار',
          message: 'ایمیل وارد شده اشتباه است'
        });
        e.target.email.select();
        return;
      }
    }

    if (data.username) {
      if (!validateUsername(data.username)) {
        iziToast.warning({
          rtl: true,
          title: 'هشدار',
          message: 'نام کاربری وارد شده اشتباه است'
        });
        e.target.username.select();
        return;
      }
    }

    if (data.password) {
      if (data.password.length < 8) {
        iziToast.warning({
          rtl: true,
          title: 'هشدار',
          message: 'رمز عبور باید حداقل هشت رقم باشد'
        });
        e.target.password.select();
        return;
      }
    }

    fetch(target.url, {
      method: target.method || 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      credentials: 'include',
      body: JSON.stringify(data || {})
    }).then(checkStatus).then(res => res.json()).then(answer => {
      resolve(answer);
    }).catch(e => {
      reject(e);
    });
  });
}

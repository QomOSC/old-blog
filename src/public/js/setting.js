document.forms['main-setting'].addEventListener('submit', e => {
  send({ url: '/u/setting' }, e, {
    fname: e.target.fname.value,
    lname: e.target.lname.value,
    username: e.target.username.value,
    email: e.target.email.value,
    description: e.target.description.value
  }).then(res => {
    if (res.type === 2) {
      if (res.text === 0) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'ایمیل توسط شخص دیگری گرفته شده'
        });
        e.target.email.select();
      } else if (res.text === 1) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'موارد ضروری مقدار دهی نشده اند'
        });
      } else if (res.text === 2) {
        iziErr();
      } else if (res.text === 3) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'یوزرنیم توسط شخص دیگری گرفته شده'
        });
        e.target.username.select();
      }
    } else if (res.type === 0) {
      localStorage.setItem('mainsettingdone', 1);
      window.location.href = '/u';
    }
  }).catch(() => iziErr());
});

document.forms['pass-setting'].addEventListener('submit', e => {
  send({ url: '/u/setting/password' }, e, {
    password: e.target.password.value,
    newpassword: e.target.newpassword.value
  }).then(res => {
    if (res.type === 0) {
      localStorage.setItem('passsettingdone', 1);
      window.location.href = '/u';
    } else if (res.type === 2) {
      if (res.text === 0) {
        iziErr();
      } else if (res.text === 1) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'رمز قدیمی اشتباه است'
        });
      }
    }
  }).catch(() => iziErr());
});

document.getElementById('delete-account').addEventListener('click', e => {
  e.preventDefault();

  iziToast.question({
      timeout: 10000,
      close: false,
      overlay: true,
      toastOnce: true,
      id: 'question',
      zindex: 999,
      rtl: true,
      title: 'مطمئنی؟',
      position: 'center',
      buttons: [
        ['<button><b>اره</b></button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

          fetch('/u/setting/delete', {
            method: 'POST', credentials: 'include'
          }).then(checkStatus).then(res => res.json()).then(data => {
            if (data.type === 0) {
              localStorage.setItem('delAcc', 1);
              window.location.href = '/';
            } else if (data.type === 2) {
              iziErr();
            }
          }).catch(() => {
            iziErr();
          });
        }, true],
        ['<button>نه</button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
        }]
      ]
  });
});

document
  .getElementById('remove-current-avatar')
  .addEventListener('click', e => {

    send({ url: '/u/setting/remove/avatar' }, e).then(res => {
      if (res.type === 0) {
        localStorage.setItem('userAvatarRemovedSuccess', 1);
        window.location.href = '/u';
      } else {
        iziErr();
      }
    }).catch(() => iziErr());
});

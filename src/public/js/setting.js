const mainSetting = document.forms['main-setting'];
const passSetting = document.forms['pass-setting'];

mainSetting.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(mainSetting.email.value)) {

    fetch('/u/setting', {
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
        description: mainSetting.description.value
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
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
          iziErr();
        } else if (data.text === 3) {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: 'یوزرنیم توسط شخص دیگری گرفته شده'
          });
        }
      } else if (data.type === 0) {
        localStorage.setItem('mainsettingdone', 1);
        window.location.href = '/u';
      }
    }).catch(() => {
      iziErr();
    });
  } else {
    iziToast.warning({
      title: 'هشدار',
      rtl: true,
      message: 'ایمیل وارد شده اشتباه است'
    });
  }
});

passSetting.addEventListener('submit', e => {
  e.preventDefault();

  fetch('/u/setting/password', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      password: passSetting.password.value,
      newpassword: passSetting.newpassword.value,
    })
  }).then(checkStatus).then(res => res.json()).then(data => {
    if (data.type === 0) {
      localStorage.setItem('passsettingdone', 1);
      window.location.href = '/u';
    } else if (data.type === 2) {
      if (data.text === 0) {
        iziErr();
      } else if (data.text === 1) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'رمز قدیمی اشتباه است'
        });
      }
    }
  }).catch(() => {
    iziErr();
  });
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
  .addEventListener('click', () => {

  fetch('/u/setting/remove/avatar', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json()).then(data => {
    if (data.type === 0) {
      localStorage.setItem('userAvatarRemovedSuccess', 1);
      window.location.href = '/u';
    } else {
      iziErr();
    }
  }).catch(e => {
    console.log(e);
    iziErr();
  });
});

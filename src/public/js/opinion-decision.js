const accept = document.getElementsByClassName('accept-form');
const reject = document.getElementsByClassName('reject-form');

for (let i = 0; i < accept.length; i++) {
  accept[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(accept[i].getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accpet': 'application/json'
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'موفق',
          message: 'نظر با موفقیت در سایت نشان داده میشود'
        });
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziErr();
        } else if (data.text === 1) {
          iziToast.success({
            rtl: true,
            title: 'شما مدیر نیستید',
          });
        }
      }
      document.getElementById(accept[i].id.value).style.display = 'none';
    }).catch(() => {
      iziErr();
    });
  });
}

for (let i = 0; i < reject.length; i++) {
  reject[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(reject[i].getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accpet': 'application/json'
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          rtl: true,
          title: 'موفق',
          message: 'نظر با موفقیت حذف شد'
        });
      } else if (data.type === 2) {
        if (data.text === 0) {
          iziErr();
        } else if (data.text === 1) {
          iziToast.success({
            rtl: true,
            title: 'شما مدیر نیستید',
          });
        }
      }
      document.getElementById(reject[i].id.value).style.display = 'none';
    }).catch(() => {
      iziErr();
    });
  });
}

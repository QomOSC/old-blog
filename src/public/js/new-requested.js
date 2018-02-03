const decline = document.getElementsByClassName('decline');
const accept = document.getElementsByClassName('accept');

for (let i = 0; i < accept.length; i++) {
  accept[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(accept[i].getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          title: 'کاربر به سایت اضافه شد!',
          rtl: true
        });
        document
        .getElementById(accept[i].username.value)
        .style.display = 'none';
      } else if (data.type === 2) {
        iziErr();
      }
    }).catch(() => {
      iziErr();
    });
  });
}

for (let i = 0; i < decline.length; i++) {
  decline[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(decline[i].getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        iziToast.success({
          title: 'کاربر از سایت حذف شد',
          rtl: true
        });
        document
        .getElementById(decline[i].username.value)
        .style.display = 'none';
      } else if (data.type === 2) {
        iziErr();
      }
    }).catch(() => {
      iziErr();
    });
  });
}

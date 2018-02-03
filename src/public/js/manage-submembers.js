const remove = document.getElementsByClassName('remove');

for (let i = 0; i < remove.length; i++) {
  remove[i].addEventListener('submit', e => {
    e.preventDefault();

    fetch(remove[i].getAttribute('action'), {
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
        .getElementById(remove[i].username.value)
        .style.display = 'none';
      } else if (data.type === 2) {
        iziErr();
      }
    }).catch(() => {
      iziErr();
    });
  });
}

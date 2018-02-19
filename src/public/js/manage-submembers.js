const remove = document.getElementsByClassName('remove');
const removeIm = document.forms['remove-immidiately'];

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

removeIm.addEventListener('submit', e => {
  e.preventDefault();

  console.log(e.target.getAttribute('action') + e.target.username.value);
  fetch(e.target.getAttribute('action') + e.target.username.value, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    credentials: 'include'
  }).then(res => res.json()).then(data => {
    if (data.type === 0) {
      iziToast.success({
        rtl: true,
        title: 'کاربر با موفقیت حذف شد'
      });
    } else {
      iziErr();
    }
  }).catch(err => console.log(err));
});

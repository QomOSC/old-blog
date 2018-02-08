const edit = document.forms['edit-post'];

edit.addEventListener('submit', e => {
  e.preventDefault();

  const minutes = Math.ceil(edit.content.value.length / 386);

  fetch(edit.getAttribute('action'), {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify({
      title: edit.title.value,
      content: edit.content.value,
      id: edit.id.value,
      minutes
    })
  }).then(res => res.json()).then(data => {
    if (data.type === 0) {
      localStorage.setItem('editpostsuccessfully', 1);
      window.location.href = '/u';
    } else if (data.type === 2) {
      iziErr();
    }
    console.log(data);
  }).catch(() => {
    iziErr();
  });
});

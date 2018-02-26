document.forms['edit-post'].addEventListener('submit', e => {
  const minutes = Math.ceil(e.target.content.value.length / 386);

  send({
    url: e.target.getAttribute('action')
  },
  e,
  {
    title: e.target.title.value,
    content: e.target.content.value,
    id: e.target.id.value,
    minutes
  }).then(res => {
    if (res.type === 0) {
      localStorage.setItem('editpostsuccessfully', 1);
      window.location.href = '/u';
    } else { iziErr(); }
  }).catch(() => iziErr());
});

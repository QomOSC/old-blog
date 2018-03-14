document.forms['reject-form'].addEventListener('submit', e => {
  console.log(e.target.getAttribute('action'));

  send({ url: e.target.getAttribute('action') }, e).then(res => {
    if (res.type === 0) {
      localStorage.setItem('rejectArticleSuccessful', 1);
      window.location.href = '/u';
    } else {
      iziErr();
    }
  }).catch(() => iziErr());
});

document.forms['edit-form'].addEventListener('submit', e => {
  console.log(e.target.getAttribute('action'));

  send({ url: e.target.getAttribute('action') }, e, {
    title: e.target.title.value,
    content: e.target.content.value
  }).then(res => {
    if (res.type === 0) {
      localStorage.setItem('acceptArticleSuccessful', 1);
      window.location.href = '/u';
    } else {
      iziErr();
    }
  }).catch(() => iziErr());
});

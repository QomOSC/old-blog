document.forms['add-conference'].addEventListener('submit', e => {
  send({
    url: e.target.getAttribute('action')
  },
  e,
  {
    title: e.target.title.value,
    description: e.target.description.value,
    providers: e.target.providers.value
  }).then(res => {
    if (res.type === 0) {
      localStorage.setItem('requestforconferencesuccessful', 1);
      window.location.href = '/u';
    } else if (res.type === 2) {
      iziErr();
    }
  }).catch(() => iziErr());
});

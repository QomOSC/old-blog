const form = document.forms['add-post'];
const preview = document.getElementById('preview');

preview.addEventListener('click', e => {
  // Convert to HTML
  const converter = new showdown.Converter();
  const text = form.content.value;
  const html = converter.makeHtml(text);
  // Show
  document.getElementById('show').innerHTML = '';
  document.getElementById('show').insertAdjacentHTML('afterend', html);
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const minutes = Math.ceil(form.content.value.length / 386);

  // Send
  fetch('/u/post/add', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      title: form.title.value,
      content: form.content.value,
      minutes
    })
  }).then(checkStatus).then(res => res.json()).then(data => {
    if (data.type === 0) {
      iziToast.success({
        title: 'موفق',
        rtl: true,
        message: 'پیام شما با موفقیت پست شد'
      });
    } else if (data.type === 2) {
      iziToast.error({
        title: 'خطا!',
        rtl: true,
        message: 'مشکلی پیش آمده، بعدا امتحان کنید'
      });
    }
  }).catch(() => {
    iziToast.error({
      title: 'خطا!',
      rtl: true,
      message: 'مشکلی پیش آمده، بعدا امتحان کنید'
    });
  });
});

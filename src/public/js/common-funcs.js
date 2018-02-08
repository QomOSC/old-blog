function iziErr() {
  iziToast.error({
    title: 'خطا!',
    rtl: true,
    message: 'مشکلی پیش آمده، بعدا امتحان کنید'
  });
}

function getQuery(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');

    let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);

    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ''));
}

if (parseInt(localStorage.getItem('loggedout')) === 1) {
  iziToast.success({
    title: 'خروج موفق',
    rtl: true
  });
  localStorage.removeItem('loggedout');
}
if (parseInt(localStorage.getItem('sentPost')) === 1) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'پیام شما با موفقیت پست شد'
  });
  localStorage.removeItem('sentPost');
}

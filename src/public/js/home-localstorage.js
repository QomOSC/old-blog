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
if (parseInt(localStorage.getItem('delAcc')) === 1) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'حساب شما با موفقیت حذف شد'
  });
  localStorage.removeItem('delAcc');
}
if (parseInt(localStorage.getItem('unsubscribed')) === 1) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'شما با موفقیت از خبرنامه خارج شدید'
  });
  localStorage.removeItem('unsubscribed');
}

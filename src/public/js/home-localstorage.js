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
if (parseInt(localStorage.getItem('signedupsuccessfully')) === 1) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'حساب شما با موفقیت ساخته شد'
  });
  localStorage.removeItem('signedupsuccessfully');
}
if (parseInt(localStorage.getItem('mainsettingdone')) === 1) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'اطلاعات شما با موفقیت به روز رسانی شد'
  });
  localStorage.removeItem('mainsettingdone');
}
if (parseInt(localStorage.getItem('passsettingdone')) === 1) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'اطلاعات شما با موفقیت به روز رسانی شد'
  });
  localStorage.removeItem('passsettingdone');
}
if (parseInt(localStorage.getItem('avatarsettingdone')) === 1) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'عکس شما با موفقیت تغییر کرد'
  });
  localStorage.removeItem('avatarsettingdone');
}
if (parseInt(localStorage.getItem('editpostsuccessfully')) === 1) {
  iziToast.success({
    rtl: true,
    title: 'موفق',
    message: 'پست شما با موفقیت تغییر یافته شد.'
  });
  localStorage.removeItem('editpostsuccessfully');
}

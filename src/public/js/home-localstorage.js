if (localStorage.getItem('loggedout')) {
  iziToast.success({
    title: 'خروج موفق',
    rtl: true
  });
  localStorage.removeItem('loggedout');
}
if (localStorage.getItem('sentPost')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'پیام شما با موفقیت پست شد'
  });
  localStorage.removeItem('sentPost');
}
if (localStorage.getItem('delAcc')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'حساب شما با موفقیت حذف شد'
  });
  localStorage.removeItem('delAcc');
}
if (localStorage.getItem('unsubscribed')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'شما با موفقیت از خبرنامه خارج شدید'
  });
  localStorage.removeItem('unsubscribed');
}
if (localStorage.getItem('signedupsuccessfully')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'حساب شما با موفقیت ساخته شد'
  });
  localStorage.removeItem('signedupsuccessfully');
}
if (localStorage.getItem('mainsettingdone')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'اطلاعات شما با موفقیت به روز رسانی شد'
  });
  localStorage.removeItem('mainsettingdone');
}
if (localStorage.getItem('passsettingdone')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'اطلاعات شما با موفقیت به روز رسانی شد'
  });
  localStorage.removeItem('passsettingdone');
}
if (localStorage.getItem('avatarsettingdone')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'عکس شما با موفقیت تغییر کرد'
  });
  localStorage.removeItem('avatarsettingdone');
}
if (localStorage.getItem('editpostsuccessfully')) {
  iziToast.success({
    rtl: true,
    title: 'موفق',
    message: 'پست شما با موفقیت تغییر یافته شد.'
  });
  localStorage.removeItem('editpostsuccessfully');
}
if (localStorage.getItem('addgalleryphoto')) {
  iziToast.success({
    rtl: true,
    title: 'موفق',
    message: 'عکس شما با موفقیت به گالری اضافه شد'
  });
  localStorage.removeItem('addgalleryphoto');
}
if (localStorage.getItem('requestforconferencesuccessful')) {
  iziToast.success({
    title: 'درخواست با موفقیت ارسال شد',
    rtl: true
  });
  localStorage.removeItem('requestforconferencesuccessful');
}
if (localStorage.getItem('commentregisteredsuccessful')) {
  iziToast.success({
    rtl: true,
    title: 'موفق',
    message: 'نظر شما با موفقیت ثبت شد'
  });
  localStorage.removeItem('commentregisteredsuccessful');
}
if (localStorage.getItem('userAvatarRemovedSuccess')) {
  iziToast.success({
    rtl: true,
    title: 'موفق',
    message: 'عکس شما با موفقیت حذف شد'
  });
  localStorage.removeItem('userAvatarRemovedSuccess');
}
if (localStorage.getItem('recoveryLinkHasSentSuccess')) {
  iziToast.success({
    rtl: true,
    title: 'موفق',
    message: 'لینک تغییر رمز به ایمیل شما فرستاده شد'
  });
  localStorage.removeItem('recoveryLinkHasSentSuccess');
}

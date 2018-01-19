if (parseInt(localStorage.getItem('loggedout')) === 1) {
  iziToast.success({
    title: 'خروج موفق',
    rtl: true
  });
  localStorage.removeItem('loggedout');
}

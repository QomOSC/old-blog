import izitoast from 'izitoast';

const error = () => {
  izitoast.error({
    rtl: true,
    title: 'خطا! بعدا امتحان کنید'
  });
};

const forbid = () => {
  izitoast.error({
    rtl: true,
    title: 'شما اجازه این کار را ندارید'
  });
};

export default {
  forbid,
  error
};

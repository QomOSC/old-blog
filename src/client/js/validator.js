import izitoast from 'izitoast';
/* eslint-disable */

function validateEmail(email){var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(email);}

function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }
  return true;
}

const validateUsername = username =>
  /^[a-zA-Z0-9]+([_.]?[a-zA-Z0-9])*$/.test(username);

const validateImage = img => {
  const type = img.type.split('/')[1];

  if (img.size > 1048576) {
    izitoast.warning({
      rtl: true,
      title: 'حجم فایل حداکثر می تواند ۱ مگابایت باشد.'
    });

    return false;
  }

  if (!['jpg', 'jpeg', 'png'].includes(type)) {
    console.log(type);
    izitoast.warning({
      rtl: true,
      title: 'فرمت فایل باید jpg یا png باشد'
    });

    return false;
  }
  return true;
};

export {
  validateEmail as email,
  validatePassword as password,
  validateUsername as username,
  validateImage as image
};

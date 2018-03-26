/* eslint-disable */

function validateEmail(email){var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(email);}

function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }
  return true;
}

const validateUsername = username =>
  /^[a-zA-Z0-9]+([_ .]?[a-zA-Z0-9])*$/.test(username);

export {
  validateEmail as email,
  validatePassword as password,
  validateUsername as username
};

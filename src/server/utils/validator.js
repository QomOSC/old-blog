/* eslint-disable */

const validateEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
const validateUsername = username => /^[a-zA-Z ]{2,30}$/.test(username);
const validatePassword = password => password.length < 8 ? false : true;

export {
  validateEmail as email,
  validatePassword as password,
  validateUsername as username,
};

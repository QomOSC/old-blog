const validateEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email); //eslint-disable-line
const validateUsername = username => /^[a-zA-Z0-9]+([_ .]?[a-zA-Z0-9])*$/.test(username);

export {
  validateEmail as e,
  validateUsername as u
};

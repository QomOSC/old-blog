function validateEmail(email){var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(email);}
function validateUsername(username){var re=/^[a-zA-Z0-9]+([_ .]?[a-zA-Z0-9])*$/; return re.test(username);}

import types from 'Root/actions';

export default (state = '', action) => {
  switch (action.type) {

    case types.CAPTCHA: {
      return action.captcha;
    }

    default: {
      return state;
    }
  }
};

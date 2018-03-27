import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {

    case types.user.LOGIN: {
      return {
        ...action.user,
        logged: true
      };
    }

    default: {
      return state;
    }
  }
};

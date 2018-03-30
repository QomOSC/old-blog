import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {

    case types.user.LOGIN: {
      return {
        ...action.user,
        logged: true
      };
    }

    case types.user.LOGOUT: {
      return {
        logged: false
      };
    }

    case types.user.CHANGE_NAME: {
      return {
        ...state,
        name: action.name
      };
    }

    case types.user.CHANGE_EMAIL: {
      return {
        ...state,
        email: action.email
      };
    }

    default: {
      return state;
    }
  }
};

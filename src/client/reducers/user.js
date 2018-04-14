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

    case types.user.DELETE: {
      return {};
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

    case types.user.UPDATE_AVATAR: {
      return {
        ...state,
        avatar: action.avatar
      };
    }

    case types.user.REMOVE_AVATAR: {
      return {
        ...state,
        avatar: null
      };
    }

    case types.user.CHANGE_USERNAME: {
      return {
        ...state,
        username: action.username
      };
    }

    case types.user.CHANGE_DESCRIPTION: {
      return {
        ...state,
        description: action.description
      };
    }

    default: {
      return state;
    }
  }
};

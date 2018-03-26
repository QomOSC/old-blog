import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {

    case types.user.LOAD: {
      return {
        ...state,
        ...action.data
      };
    }

    default: {
      return state;
    }
  }
};

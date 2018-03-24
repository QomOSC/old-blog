import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {

    case types.user.ADD: {
      return state;
    }

    default: {
      return state;
    }
  }
};

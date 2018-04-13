import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.users.LOAD: {
      return action.users;
    }
    
    default: {
      return state;
    }
  }
};

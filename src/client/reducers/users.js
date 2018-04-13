import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.users.LOAD: {
      return action.users;
    }

    case types.users.DROP: {
      let users = [...state];
      users = users.filter(user => user._id !== action._id);

      return users;
    }

    default: {
      return state;
    }
  }
};

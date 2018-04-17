import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.conferences.LOAD: {
      return action.conferences;
    }

    default: {
      return state;
    }
  }
};

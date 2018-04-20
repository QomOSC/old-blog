import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.conferences.LOAD: {
      return action.conferences;
    }

    case types.conferences.DONE: {
      const confs = [...state];

      for (let i = 0; i < confs.length; i++) {
        if (confs[i]._id === action._id) {
          confs[i].done = true;
          break;
        }
      }

      return confs;
    }

    default: {
      return state;
    }
  }
};

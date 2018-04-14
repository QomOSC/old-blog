import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.comments.LOAD: {
      return action.comments;
    }

    case types.comments.DROP: {
      let comments = [...state];
      comments = comments.filter(comment => comment._id !== action._id);

      return comments;
    }

    default: {
      return state;
    }
  }
};

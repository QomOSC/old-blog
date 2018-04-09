import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.articles.LOAD: {
      return [
        ...action.data
      ];
    }

    case types.articles.DELETE: {
      const articles = [...state];

      for (const [i, v] of articles.entries()) {
        if (v._id === action.id) {
          articles.splice(i, 1);
          break;
        }
      }

      return articles;
    }

    default: {
      return state;
    }
  }
};

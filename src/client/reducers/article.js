import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {

    case types.article.LOAD: {
      return action.article;
    }

    case types.article.LIKE: {
      return {
        ...state,
        liked: true,
        likeLength: state.likeLength + 1
      };
    }

    case types.article.DISLIKE: {
      return {
        ...state,
        liked: false,
        likeLength: state.likeLength - 1
      };
    }

    case types.article.VIEWER: {
      return {
        ...state,
        viewerLength: state.viewerLength + 1
      };
    }

    default: {
      return state;
    }
  }
};

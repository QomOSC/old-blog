import types from 'Root/actions';

import send from 'Root/js/send';

export default (_id, ip) => async dispatch => {
  const { type, text } = await send('/article/viewer', { _id, ip });

  if (type === 0 && text === 0) {
    dispatch({
      type: types.article.VIEWER
    });
  }
};

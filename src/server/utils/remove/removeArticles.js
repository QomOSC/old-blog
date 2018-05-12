import Article from 'Root/models/Article';
import Tag from 'Root/models/Tag';

import removeImage from 'Root/utils/removeImage';

export default id => new Promise(async (res, rej) => {
  const articles = await Article.find({ author: id });

  try {
    for (const i of articles) {
      await removeImage(i.avatar);

      const tags = await Tag.find({ article: i._id });

      for (const j of tags) {
        await j.remove();
      }

      await i.remove();
    }

    res();
  }
  catch (e) {
    rej();
  }
});

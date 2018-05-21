import { Router } from 'express';

import Article from 'Root/models/Article';
import User from 'Root/models/User';
import Tag from 'Root/models/Tag';

import removeImage from 'Root/utils/removeImage';
import { admin } from 'Root/perms';

const router = new Router();


router.post('/panel/articles/reject', admin, async (req, res) => {
  if (!req.body.id) {
    res.json({ type: 4 });

    return;
  }

  try {
    const article = await Article.findById(req.body.id);

    if (!article) {
      res.json({ type: 2, text: 0 });

      return;
    }

    const author = await User.findById(article.author);

    author.articles.splice(article._id);

    await author.save();

    const tags = await Tag.find({ article: article._id });

    if (tags.length) {
      for (const i of tags) {
        await i.remove();
      }
    }

    await removeImage(article.avatar);

    await article.remove();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;

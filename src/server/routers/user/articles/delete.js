import { Router } from 'express';

import Article from 'Root/models/Article';
import User from 'Root/models/User';
import Tag from 'Root/models/Tag';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import removeImage from 'Root/utils/removeImage';

const router = new Router();


router.post(
  '/panel/articles/delete',
  logged,
  requirements(['id']),
  async (req, res) => {

  try {
    const article = await Article.findOne({
      _id: req.body.id,
      author: req.session.user
    });

    if (!article) {
      return res.json({ type: 2, text: 0 });
    }

    const author = await User.findById(req.session.user);

    await article.remove();

    author.articles.splice(req.body.id, 1);

    await author.save();

    const tags = await Tag.find({ article: req.body.id });

    if (tags.length) {
      for (const i of tags) {
        await i.remove();
      }
    }

    await removeImage(article.avatar);

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;

import { Router } from 'express';

const {
  Member,
  Article,
  Tag,
  Newsletter,
  Conference,
  Gallery
} = rootRequire('./models');

const { logged } = rootRequire('./perms');
const { removeImage, remove } = rootRequire('./utils');

const router = new Router();

router.post('/u/setting/delete', logged, async(req, res) => {

  const member = await Member.findOne({ _id: req.member.user._id });

  try {
    if (member.avatar) {
      await removeImage(member.avatar);
    }

    await member.remove();
    await remove.userArticle(member._id, Article, Tag, removeImage);
    await remove.userNewsletter(member.email, Newsletter);
    await remove.userConference(member._id, Conference);
    await remove.userGallery(member._id, Gallery);

    req.member.logout();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;

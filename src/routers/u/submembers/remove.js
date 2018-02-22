import { Router } from 'express';

const {
  Member,
  Article,
  Tag,
  Newsletter,
  Conference,
  Gallery
} = rootRequire('./models');
const perm = rootRequire('./perms');
const { removeImage, remove, email } = rootRequire('./utils');

const router = new Router();

router.post(
  '/u/sub/remove/:username',
  perm.logged,
  perm.u.admin,
  async(req, res) => {
    req.params.username = req.params.username.toLowerCase();

    const member = await Member.findOne({ username: req.params.username });

    if (member && member.type === 1) {

      await member.remove();
      await remove.userArticle(member._id, Article, Tag, removeImage);
      await remove.userNewsletter(member.email, Newsletter);
      await remove.userConference(member._id, Conference);
      await remove.userGallery(member._id, Gallery);

      email.submembers.reject(member.email).then(() => {
        res.json({ type: 0 });
      }).catch(() => {
        res.json({ type: 2, text: 0 });
      });
    } else {
      res.json({ type: 2, text: 0 });
    }
});

export default router;

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
const { email } = rootRequire('./utils');
const { removeImage, remove } = rootRequire('./utils');

const router = new Router();

router.post(
  '/u/sub/manage/remove/:username',
  perm.logged,
  perm.u.admin,
  async(req, res) => {
  req.params.username = req.params.username.toLowerCase();

  const member = await Member.findOne({ username: req.params.username });

  if (member && member.type <= 2) {

    try {
      if (member.avatar) {
        await removeImage(member.avatar);
      }

      await member.remove();
      await remove.userArticle(member._id, Article, Tag, removeImage);
      await remove.userNewsletter(member.email, Newsletter);
      await remove.userConference(member._id, Conference);
      await remove.userGallery(member._id, Gallery);

      const admin = await Member.findOne({ _id: req.member.user._id });

      if (admin && admin.submembers.length !== 0) {
        admin.submembers.splice(member, 1);

        admin.save().then(() => {
          // OK
          res.json({ type: 0 });
          email.submembers.delete().then(() => {}).catch(() => {});
        }).catch(() => {
          res.json({ type: 2, text: 0 });
        });
      } else {
        res.json({ type: 2, text: 0 });
      }
    } catch (e) {
      res.json({ type: 2, text: 0 });
    }
  } else {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;

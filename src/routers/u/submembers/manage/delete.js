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

  if (!member) {
    // User not found
    res.json({ type: 2, text: 0 });
    return;
  }

  if (req.member.user.type === 3 && member.type === 3) {
    // You can't remove someone who is in the same category with you
    res.json({ type: 1, text: 0 });
    return;
  }

  if (req.member.user.type === 4 && member.type === 4) {
    // You can't remove someone who is in the same category with you
    res.json({ type: 1, text: 0 });
    return;
  }

  if (req.member.user.type === 3 && member.type === 4) {
    // You can't remove someone who is in the upper category than you
    res.json({ type: 1, text: 1 });
    return;
  }

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

    if (admin.submembers.includes(member)) {
      admin.submembers.splice(member, 1);
    }

    await admin.save();
    // OK
    res.json({ type: 0 });
    email.submembers.delete(member.email);
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;

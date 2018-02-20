import { Router } from 'express';

const { Member } = rootRequire('./models');
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
    await remove.userArticle(member._id);
    // await remove.userNewsletter(member.email);
    // await remove.userConference(member._id);
    // await remove.userGallery(member._id);

    req.member.logout();

    res.json({ type: 0 });
  } catch (e) {
    console.log(e);
    res.json({ type: 2 });
  }
});

export default router;

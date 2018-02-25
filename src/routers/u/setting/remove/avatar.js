import { Router } from 'express';

const { Member } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post('/u/setting/remove/avatar', logged, async(req, res) => {
  const member = await Member.findOne({ _id: req.member.user._id });

  if (member.avatar) {
    await removeImage(member.avatar);

    member.avatar = null;

    await member.save();
  }

  res.json({ type: 0 });
});

export default router;

import { Router } from 'express';

const { Member } = rootRequire('./models');
const perm = rootRequire('./perms');
const { email } = rootRequire('./utils');

const router = new Router();

router.post(
  '/u/sub/add/:username',
  perm.logged,
  perm.u.admin,
  async(req, res) => {

  req.params.username = req.params.username.toLowerCase();

  const member = await Member.findOne({ username: req.params.username });

  if (!member || !member.type === 1) {
    res.json({ type: 2, text: 0 });
    return;
  }

  member.type = 2;

  member.save().then(async() => {

    const admin = await Member.findOne({ _id: req.member.user._id });

    if (!admin) {
      res.json({ type: 2, text: 0 });
      return;
    }

    if (admin.submembers.indexOf(member._id) !== -1) {
      res.json({ type: 2, text: 0 });
      return;
    }

    admin.submembers.push(member._id);

    admin.save().then(() => {
      res.json({ type: 0 });
      email.submembers.accept(member.email).catch();
    }).catch(() => {
      res.json({ type: 2, text: 0 });
    });
  }).catch(() => {
    res.json({ type: 2, text: 0 });
  });
});

export default router;

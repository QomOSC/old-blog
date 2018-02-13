import { Router } from 'express';

const { Member } = rootRequire('./models');
const perm = rootRequire('./perms');
const { email } = rootRequire('./utils');

const router = new Router();

router.post(
  '/u/sub/manage/remove/:username',
  perm.logged,
  perm.u.admin,
  async(req, res) => {
  req.params.username = req.params.username.toLowerCase();

  const member = await Member.findOne({ username: req.params.username });

  if (member && member.type === 2) {
    member.remove().then(async() => {

      const admin = await Member.findOne({ _id: req.member.user._id });

      if (admin && admin.submembers.length !== 0) {
        admin.submembers.splice(member, 1);

        admin.save().then(() => {
          // OK
          email.submembers.delete().then(() => {
            res.json({ type: 0 });
          }).catch(() => {
            res.json({ type: 2, text: 0 });
          });
        }).catch(() => {
          res.json({ type: 2, text: 0 });
        });
      } else {
        res.json({ type: 2, text: 0 });
      }
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 0 });
    });
  } else {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;

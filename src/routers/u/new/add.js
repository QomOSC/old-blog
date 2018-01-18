import { Router } from 'express';

const perm = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.post(
  '/u/new/add/:username',
  perm.logged,
  perm.u.admin,
  (req, res) => {
    req.params.username = req.params.username.toLowerCase();

    Member.findOne({ username: req.params.username }).then(member => {
      if (member && member.type === 1) {
        member.type = 2;

        member.save().then(() => {
          res.json({ type: 0 });
        }).catch(() => {
          res.json({ type: 2, text: 0 });
        });
      }
    }).catch(() => {
      res.json({ type: 2, text: 0 });
    });
});

export default router;

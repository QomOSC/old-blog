import { Router } from 'express';

const perm = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.post(
  '/u/new/remove/:username',
  perm.logged,
  perm.u.admin,
  (req, res) => {
    req.params.username = req.params.username.toLowerCase();

    Member.findOne({ username: req.params.username }).then(member => {

      if (member && member.type === 1) {
        member.remove().then(() => {
          res.json({ type: 0 });
        }).catch(() => {
          res.json({ type: 2, text: 0 });
        });
      } else {
        res.json({ type: 2, text: 0 });
      }
    }).catch(() => {
      res.json({ type: 2, text: 0 });
    });
});

export default router;
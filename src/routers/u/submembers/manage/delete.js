import { Router } from 'express';

const perm = rootRequire('./perms');
const { Member } = rootRequire('./models');
const { email } = rootRequire('./utils');

const router = new Router();

router.post(
  '/u/sub/manage/remove/:username',
  perm.logged,
  perm.u.admin,
  (req, res) => {
  req.params.username = req.params.username.toLowerCase();

  Member.findOne({ username: req.params.username }).then(member => {
    if (member && member.type === 2) {
      member.remove().then(() => {

        Member.findOne({ _id: req.member.user._id }).then(admin => {
          if (admin && JSON.stringify(admin.submembers) !== '[]') {
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
          res.json({ type: 2, text: 0 });
        });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    } else {
      // Error
      res.json({ type: 2, text: 0 });
    }
  }).catch(() => {
    // Error
    res.json({ type: 2, text: 0 });
  });
});

export default router;

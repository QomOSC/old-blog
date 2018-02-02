import { Router } from 'express';

const { login } = rootRequire('./perms');
const { Member, Recovery } = rootRequire('./models');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.post('/recovery/change', login, (req, res) => {
  if (req.body.token && req.body.password) {
    Recovery.findOne({ token: req.body.token }).then(rec => {
      if (rec) {
        Member.findOne({ _id: rec.member }).then(member => {
          if (member) {
            member.password =
              crypt.encrypt(req.body.password, member.email);

            member.save().then(() => {
              rec.remove().then(() => {
                res.json({ type: 0 });
              }).catch(() => {
                // Error
                res.json({ type: 2, text: 2 });
              });
            }).catch(() => {
              // Error
              res.json({ type: 2, text: 2 });
            });
          } else {
            // Error
            res.json({ type: 2, text: 2 });
          }
        }).catch(() => {
          // Error
          res.json({ type: 2, text: 2 });
        });
      } else {
        // Wrong token
        res.json({ type: 2, text: 0 });
      }
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 2 });
    });
  } else {
    // Not complete values
    res.json({ type: 2, text: 1 });
  }
});

export default router;

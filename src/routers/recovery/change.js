import { Router } from 'express';

const { Member, Recovery } = rootRequire('./models');
const { login } = rootRequire('./perms');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.post('/recovery/change', login, async(req, res) => {
  if (req.body.token && req.body.password) {

    const rec = await Recovery.findOne({ token: req.body.token });

    if (rec) {
      const member = await Member.findOne({ _id: rec.member });

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
    } else {
      // Wrong token
      res.json({ type: 2, text: 0 });
    }
  } else {
    // Not complete values
    res.json({ type: 2, text: 1 });
  }
});

export default router;

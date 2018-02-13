import { Router } from 'express';

const { Member, Recovery } = rootRequire('./models');
const { login } = rootRequire('./perms');
const { email, random } = rootRequire('./utils');

const router = new Router();

router.get('/recovery', login, (req, res) => {
  res.render('recovery/recovery.njk');
});

router.post('/recovery', login, async(req, res) => {
  if (req.body.email && req.body.captcha) {
    req.body.email = req.body.email.toLowerCase();

    if (req.body.captcha === req.session.captcha) {
      req.session.captcha = null;

      const r = await random();
      const member = await Member.findOne({ email: req.body.email });

      if (member) {

        const rec = new Recovery({
          token: r,
          member: member._id
        });

        rec.save().then(() => {

          email.recovery(req.body.email, rec.token).then(() => {
            // OK
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
        // Email not found
        res.json({ type: 2, text: 3 });
      }
    } else {
      // Wrong Captcha
      res.json({ type: 2, text: 1 });
    }
  } else {
    // Values are not complete
    res.json({ type: 2, text: 0 });
  }
});

router.get('/recovery/:token', login, async(req, res) => {

  const member = await Recovery.findOne({ token: req.params.token });

  if (member) {
    res.render('recovery/change.njk', {
      token: req.params.token
    });
  } else {
    res.reply.notFound();
  }
});

export default router;

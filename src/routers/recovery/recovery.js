import { Router } from 'express';
import { unique } from 'stringing';

const { login } = rootRequire('./perms');
const { Member, Recovery } = rootRequire('./models');
const { sendRecovery } = rootRequire('./utils');

const router = new Router();

router.get('/recovery', login, (req, res) => {
  res.render('recovery/recovery.njk');
});

router.post('/recovery', login, (req, res) => {
  if (req.body.email && req.body.captcha) {
    req.body.email = req.body.email.toLowerCase();

    if (req.body.captcha === req.session.captcha) {
      req.session.captcha = null;

      Member.findOne({ email: req.body.email }).then(member => {
        if (member) {
          const rec = new Recovery({
            token: unique(40),
            member: member._id
          });

          rec.save().then(() => {
            console.log(rec);

            sendRecovery(req.body.email, rec.token).then(() => {
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
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 2 });
      });
    } else {
      // Wrong Captcha
      res.json({ type: 2, text: 1 });
    }
  } else {
    // Values are not complete
    res.json({ type: 2, text: 0 });
  }
});

router.get('/recovery/:token', login, (req, res) => {
  Recovery.findOne({ token: req.params.token }).then(member => {
    if (member) {
      res.render('recovery/change.njk', {
        token: req.params.token
      });
    } else {
      res.reply.notFound();
    }
  }).catch(() => {
    res.reply.notFound();
  });
});

export default router;

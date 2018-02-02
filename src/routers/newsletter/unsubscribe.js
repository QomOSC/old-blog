import { Router } from 'express';

const { Newsletter } = rootRequire('./models');

const router = new Router();

router.get('/unsubscribe', (req, res) => {
  res.render('newsletter/unsubscribe.njk');
});

router.post('/unsubscribe', (req, res) => {
  req.body.email = req.body.email.toLowerCase();
  req.body.captcha = req.body.captcha.toLowerCase();

  if (req.body.captcha === req.session.captcha) {

    Newsletter.findOne({ email: req.body.email }).then(member => {
      if (member) {
        member.remove().then(() => {
          req.session.captcha = null;
          res.json({ type: 0 });
        }).catch(() => {
          // Error
          res.json({ type: 2, text: 2 });
        });
      } else {
        // User not found in Newsletter
        res.json({ type: 2, text: 1 });
      }
    });
  } else {
    // Wrong Captcha
    res.json({ type: 2, text: 0 });
  }
});

export default router;

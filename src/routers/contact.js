import { Router } from 'express';

const { Opinion } = rootRequire('./models');

const router = new Router();

router.get('/contact', (req, res) => {
  res.render('contact.njk');
});

router.post('/contact', (req, res) => {
  if (req.body.email &&
      req.body.name &&
      req.body.title &&
      req.body.captcha &&
      req.body.description) {
    req.body.email = req.body.email.toLowerCase();
    req.body.captcha = req.body.captcha.toLowerCase();

    if (req.body.captcha === req.session.captcha) {
      const opinion = new Opinion({
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        description: req.body.description
      });

      opinion.save().then(() => {
        req.session.captcha = null;
        res.json({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    } else {
      // Wrong Captcha
      res.json({ type: 2, text: 1 });
    }
  } else {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;

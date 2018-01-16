import { Router } from 'express';
import captcha from 'svg-captcha';

const router = new Router();

router.get('/captcha', (req, res) => {
  const newCaptcha = captcha.create({
    size: 4,
    ignoreChars: '0o1ilIQ8',
    noise: 1,
    color: true
  });

  req.session.captcha = newCaptcha.text.toLowerCase();

  res.json({ captcha: newCaptcha.data });
});

export default router;

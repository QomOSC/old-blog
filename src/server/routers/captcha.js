import { Router } from 'express';
import captcha from 'svg-captcha';

import Captcha from 'Root/models/Captcha';

const router = new Router();

router.get('/captcha', (req, res) => {
  const { data, text } = captcha.create({
    size: 4,
    ignoreChars: '0o1ilIQ8',
    noise: 1,
    color: true
  });

  const c = new Captcha({
    captcha: text.toLowerCase()
  });

  res.json({ captcha: data, token: c._id });
});

export default router;

import { Router } from 'express';
import captcha from 'svg-captcha';

const router = new Router();

router.get('/captcha', (req, res) => {
  const { data, text } = captcha.create({
    size: 4,
    ignoreChars: '0o1ilIQ8',
    noise: 1,
    color: true
  });

  console.log(text);

  res.json({ captcha: data });
});

export default router;

import { Router } from 'express';

const { Member } = rootRequire('./models');

const router = new Router();

router.get('/about', (req, res) => {
  Member.findOne({ username: 'matinkaboli' }).then(member => {
    res.render('about.njk', {
      member
    });
  }).catch(() => {
    res.render('about.njk');
  });
});

export default router;

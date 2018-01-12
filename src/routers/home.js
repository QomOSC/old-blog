import { Router } from 'express';

const { Post } = rootRequire('./models');

const router = new Router();

router.get('/', (req, res) => {

  Post.find({}).then(doc => {
    res.render('home.njk', { doc });
  }).catch(() => {
    res.send('err');
  });
});

export default router;

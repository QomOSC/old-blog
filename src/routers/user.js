import { Router } from 'express';

const { Member } = rootRequire('./models');

const router = new Router();

router.get('/user/:username', (req, res) => {
  req.params.username = req.params.username.toLowerCase();

  Member.findOne({ username: req.params.username }).then(member => {
      if (member) {
        res.render('user.njk', {
          member
        });
      } else {
        res.reply.notFound();
      }
  }).catch(() => {
    res.reply.notFound();
  });
});

export default router;

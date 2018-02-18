import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u', logged, async(req, res) => {

  const articles = await Article
  .find({ author: req.member.user._id })
  .limit(9)
  .sort({ createdAt: -1 });

  if (articles.length !== 0) {

    const allArts = [];

    function* getResponse() {

      yield new Promise(resolve => {


        for (const i of articles) {

          const oneArt = {};

          let content = i.content.split('').slice(0, 130);
          content.push('.', '.', '.');
          content = content.join('');

          oneArt.id = i._id;
          oneArt.title = i.title;
          oneArt.content = content;
          oneArt.minutes = i.minutes;
          oneArt.avatar = i.avatar;
          oneArt.viewers = i.viewers.length;
          oneArt.likes = i.likes.length;

          allArts.push(oneArt);
        }

        resolve();
      });
    }

    const iterator = getResponse();
    (function loop() {

      const next = iterator.next();
      if (next.done) {
        res.render('u/u.njk', {
          member: req.member.user,
          posts: allArts
        });

        return;
      }

      next.value.then(loop);
    })();

  } else {
    res.render('u/u.njk', {
      member: req.member.user,
      postEmpty: true
    });
  }
});

export default router;

import { Router } from 'express';

const { Opinion } = rootRequire('./models');
const perms = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/u/opinion', perms.logged, perms.u.admin, async(req, res) => {
  const opinions = await Opinion.find({ type: 1 });

  if (opinions.length === 0) {
    res.render('u/opinion/opinion.njk', {
      empty: true
    });
  } else {

    const allOpinions = [];

    function* getResponse() {
      for (const i of opinions) {
        yield new Promise(resolve => {

          const oneOpinion = {
            _id: i._id,
            name: i.name,
            email: i.email,
            title: i.title,
            description: i.description,
            createdAt: moment(i.createdAt)
          };

          allOpinions.push(oneOpinion);

          resolve();

        });
      }
    }

    const iterator = getResponse();
    (function loop() {

      const next = iterator.next();
      if (next.done) {
        res.render('u/opinion/opinion.njk', {
          opinion: allOpinions
        });
        return;
      }

      next.value.then(loop);
    })();

  }
});

export default router;

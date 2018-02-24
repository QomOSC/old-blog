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

    for (const i of opinions) {
      const oneOpinion = {
        _id: i._id,
        name: i.name,
        email: i.email,
        title: i.title,
        description: i.description,
        createdAt: moment(i.createdAt)
      };

      allOpinions.push(oneOpinion);

    }

    res.render('u/opinion/opinion.njk', {
      opinion: allOpinions
    });
  }
});

export default router;

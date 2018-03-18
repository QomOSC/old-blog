import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const perms = rootRequire('./perms');
const { moment, shorten } = rootRequire('./utils');

const router = new Router();
router.get(
  '/u/conference/manage/',
  perms.logged,
  perms.u.admin,
  async(req, res) => {

  const confs = await Conference
    .find({ type: 1 })
    .select('-__v -type')
    .lean();

  if (!confs.length) {
    res.render('u/conference/manage/manage.njk', {
      empty: true
    });
    return;
  }

  for (const i of confs.keys()) {
    confs[i].description = shorten(confs[i].description);
    confs[i].createdAt = moment(confs[i].createdAt);
    confs[i].provs = [];

    for (const j of confs[i].providers) {
      const provider = await Member
      .findOne({ username: j })
      .select('fname lname username avatar');

      if (provider) {
        confs[i].provs.push(provider);
      }
    }
  }

  res.render('u/conference/manage/manage.njk', {
    confs
  });
});

export default router;

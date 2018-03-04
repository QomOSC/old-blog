import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const perms = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();
router.get(
  '/u/conference/manage/',
  perms.logged,
  perms.u.admin,
  async(req, res) => {

  const confs = await Conference.find({ type: 1 });

  if (!confs.length) {
    res.render('u/conference/manage/manage.njk', {
      empty: true
    });
    return;
  }

  const allConfs = [];

  for (const i of confs) {
    let description = i.description.split('').slice(0, 130);
    description.push('.', '.', '.');
    description = description.join('');

    const oneConf = {
      _id: i._id,
      title: i.title,
      createdAt: moment(i.createdAt),
      providers: [],
      description
    };

    for (const j of i.providers) {

      const member = await Member.findOne({ username: j });

      if (member) {
        const oneProvider = {
          fname: member.fname,
          lname: member.lname,
          username: member.username,
          avatar: member.avatar
        };

        oneConf.providers.push(oneProvider);
      }
    }

    allConfs.push(oneConf);
  }

  res.render('u/conference/manage/manage.njk', {
    confs: allConfs
  });
});

export default router;

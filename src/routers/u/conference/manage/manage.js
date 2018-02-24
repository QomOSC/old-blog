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
    if (confs.length !== 0) {

      const allConfs = [];

      for (const i of confs) {
        let description = i.description.split('').slice(0, 130);
        description.push('.', '.', '.');
        description = description.join('');

        const oneConf = {
          _id: i._id,
          title: i.title,
          createdAt: moment(i.createdAt),
          author: {},
          description
        };

        const member = await Member.findOne({ _id: i.provider });
        if (member) {
          oneConf.author.fname = member.fname;
          oneConf.author.lname = member.lname;
          oneConf.author.username = member.username;
          oneConf.author.avatar = member.avatar;

          allConfs.push(oneConf);
        } else {
          res.reply.error();
        }
      }

      res.render('u/conference/manage/manage.njk', {
        confs: allConfs
      });

    } else {
      res.render('u/conference/manage/manage.njk', {
        empty: true
      });
    }
});

export default router;

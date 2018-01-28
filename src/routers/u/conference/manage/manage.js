import { Router } from 'express';

const { Conference } = rootRequire('./models');
const perms = rootRequire('./perms');

const router = new Router();
router.get(
  '/u/conference/manage/',
  perms.logged,
  perms.u.admin,
  (req, res) => {
    Conference.find({ type: 1 }).then(confs => {
      if (JSON.stringify(confs) !== '[]') {
        res.render('u/conference/manage/manage.njk', {
          member: req.member.user,
          confs
        });
      } else {
        res.render('u/conference/manage/manage.njk', {
          member: req.member.user,
          empty: true
        });
      }
    }).catch(() => {
      res.reply.error();
    });
});

export default router;

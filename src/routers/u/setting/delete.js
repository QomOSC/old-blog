import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Member, Post, Newsletter } = rootRequire('./models');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post('/u/setting/delete', logged, (req, res) => {
  Member.findOne({ _id: req.member.user._id }).then(member => {

    if (member) {
      if (member.avatar) {
        removeImage(member.avatar);
      }
      member.remove().then(() => {

        Newsletter.findOne({ email: req.member.user.email }).then(nl => {
          if (nl) {
            nl.remove().then(() => {
              removeMemberPosts(req, res);
            }).catch(() => {
              // Error
              res.json({ type: 2, text: 0 });
            });
          } else {
            removeMemberPosts(req, res);
          }
        })

      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    } else {
      // Error
      res.json({ type: 2, text: 0 });
    }

  }).catch(() => {
    // Error
    res.json({ type: 2, text: 0 });
  });
});

function removeMemberPosts(req, res) {
  Post.find({ author: req.member.user._id }).then(posts => {

    if (JSON.stringify(posts) === '[]') {
      req.member.logout();
      // Done
      res.json({ type: 0 });
    } else {

      function* getResponse() {
        for (const i of posts) {
          yield new Promise(resolve => {

            if (i.avatar) {
              removeImage(i.avatar);
              resolve();
            } else {
              resolve();
            }
          });
        }
      }

      const iterator = getResponse();
      (function loop() {

        const next = iterator.next();
        if (next.done) {

          req.member.logout();
          // Done
          res.json({ type: 0 });

          return;
        }

        next.value.then(loop);
      })();

    }

  }).catch(() => {
    // Error
    res.json({ type: 2, text: 0 });
  });
}

export default router;

import { Router } from 'express';

const { Member, Post, Newsletter } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post('/u/setting/delete', logged, async(req, res) => {
  const em = req.member.user.email;

  const member = await Member.findOne({ _id: req.member.user._id });

  if (member) {
    if (member.avatar) {
      removeImage(member.avatar).then(() => {}).catch(() => {});
    }

    member.remove().then(async() => {

      const nl = await Newsletter.findOne({ email: em });

      if (nl) {
        nl.remove().then(async() => {

          const posts = await Post.find({ author: req.member.user._id });

          if (posts.length === 0) {
            req.member.logout();
            // Done
            res.json({ type: 0 });
          } else {

            function* getResponse() {
              for (const i of posts) {
                yield new Promise(resolve => {

                  if (i.avatar) {
                    removeImage(i.avatar).then(() => {
                      i.remove().then(() => {
                        resolve();
                      }).catch(() => {});
                    });
                  } else {
                    i.remove().then(() => {
                      resolve();
                    }).catch(() => {});
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
      } else {

        const posts = await Post.find({ author: req.member.user._id });

        if (posts.length === 0) {
          req.member.logout();
          // Done
          res.json({ type: 0 });
        } else {

          function* getResponse() {
            for (const i of posts) {
              yield new Promise(resolve => {

                if (i.avatar) {
                  removeImage(i.avatar).then(() => {
                    i.remove().then(() => {
                      resolve();
                    }).catch(() => {});
                  });
                } else {
                  i.remove().then(() => {
                    resolve();
                  }).catch(() => {});
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
      }
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 0 });
    });
  } else {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;

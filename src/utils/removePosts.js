import { Post } from '../models';
import { removeImage } from '../utils';

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

export default removeMemberPosts;

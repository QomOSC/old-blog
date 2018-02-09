import { Router } from 'express';

const { Gallery, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/gallery', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const start = page * 12,
        stop = page * 12 + 12;

  Gallery
    .find()
    .sort({ createdAt: -1 })
    .skip(start)
    .limit(stop)
    .then(photos => {
      if (JSON.stringify(photos) === '[]') {
        res.render('gallery.njk', {
          empty: true
        });
      } else {

        const allPhotos = [];

        function* getResponse() {
          for (const i of photos) {
            yield new Promise(resolve => {

              const onePhoto = {
                _id: i._id,
                title: i.title,
                photo: i.photo,
                createdAt: moment(i.createdAt),
                author: {},
              };

              Member.findOne({ _id: i.photographer }).then(member => {
                if (member) {
                  onePhoto.author.fname = member.fname;
                  onePhoto.author.lname = member.lname;
                  onePhoto.author.username = member.username;
                  onePhoto.author.avatar = member.avatar;

                  allPhotos.push(onePhoto);
                  resolve();
                } else {
                  res.reply.error();
                }
              }).catch(() => {
                res.reply.error();
              });
            });
          }
        }

        const iterator = getResponse();
        (function loop() {

          const next = iterator.next();
          if (next.done) {
            res.render('gallery.njk', {
              photos: allPhotos
            });
            return;
          }

          next.value.then(loop);
        })();
      }
    }).catch(() => {
      res.reply.notFound();
    });
});

export default router;

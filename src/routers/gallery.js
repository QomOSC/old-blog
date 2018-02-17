import { Router } from 'express';

const { Gallery, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/gallery', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
  start = page * 12,
  stop = page * 12 + 12;

  const re = new RegExp(`.*${req.query.q || ''}.*`);

  const photos = await Gallery
      .find({ title: re })
      .sort({ createdAt: -1 })
      .skip(start)
      .limit(stop);

  if (photos.length === 0) {
    if (req.query.q) {
      res.render('gallery.njk', {
        type: 1,
        query: req.query.q,
        empty: true
      });
    } else {
      res.render('gallery.njk', {
        type: 0,
        empty: true
      });
    }
  } else {

    const allPhotos = [];

    function* getResponse() {
      for (const i of photos) {
        yield new Promise(async resolve => {

          const onePhoto = {
            _id: i._id,
            title: i.title,
            photo: i.photo,
            createdAt: moment(i.createdAt),
            author: {},
          };

          const member = await Member.findOne({ _id: i.photographer });

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
        });
      }
    }

    const iterator = getResponse();
    (function loop() {

      const next = iterator.next();
      if (next.done) {
        if (req.query.q) {
          res.render('gallery.njk', {
            photos: allPhotos,
            type: 1,
            query: req.query.q,
          });
        } else {
          res.render('gallery.njk', {
            photos: allPhotos,
            type: 0
          });
        }
        return;
      }

      next.value.then(loop);
    })();
  }
});

export default router;

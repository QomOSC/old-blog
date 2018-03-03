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

  if (!photos.length) {
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
    return;
  }

  const allPhotos = [];

  for (const i of photos) {

    const onePhoto = {
      _id: i._id,
      title: i.title,
      photo: i.photo,
      createdAt: moment(i.createdAt),
      author: {},
    };

    const member = await Member.findOne({ _id: i.photographer });

    if (!member) {
      res.reply.error();
      return;
    }

    onePhoto.author.fname = member.fname;
    onePhoto.author.lname = member.lname;
    onePhoto.author.username = member.username;
    onePhoto.author.avatar = member.avatar;

    allPhotos.push(onePhoto);
  }

  if (req.query.q) {
    res.render('gallery.njk', {
      photos: allPhotos,
      type: 1,
      query: req.query.q,
    });
    return;
  }

  res.render('gallery.njk', {
    photos: allPhotos,
    type: 0
  });
});

export default router;

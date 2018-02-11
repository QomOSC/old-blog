import { Router } from 'express';
import multer from 'multer';

const { Member } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { removeImage, storage } = rootRequire('./utils');


const upload = multer({ dest: 'uploads/', limits: 3000000, storage });

const router = new Router();

router.post(
  '/u/setting/avatar',
  logged,
  upload.single('croppedImage'),
  (req, res) => {

  Member.findOne({ _id: req.member.user._id }).then(member => {
    if (member) {
      if (member.avatar) {
        removeImage(member.avatar)
          .then(() => {
            member.avatar = req.file.filename;

            member.save().then(() => {
              res.json({ type: 0 });
            }).catch(() => {
              // Error
              res.json({ type: 2 });
            });

          }).catch(() => {
            res.json({ type: 2 });
          });
      } else {
        member.avatar = req.file.filename;

        member.save().then(() => {
          res.json({ type: 0 });
        }).catch(() => {
          // Error
          res.json({ type: 2 });
        });
      }
    } else {
      // User not Found
      res.json({ type: 2 });
    }
  }).catch(() => {
    // Error
    res.json({ type: 2 });
  });
});

export default router;

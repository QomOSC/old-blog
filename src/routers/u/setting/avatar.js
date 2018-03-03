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
  async(req, res) => {

  const member = await Member.findOne({ _id: req.member.user._id });

  if (!member) {
    // User not Found
    res.json({ type: 2 });
    return;
  }

  if (!member.avatar) {
    member.avatar = req.file.filename;

    try {
      await member.save();
      res.json({ type: 0 });
    } catch (e) {
      res.json({ type: 2 });
    }
  }

  removeImage(member.avatar).catch();

  member.avatar = req.file.filename;

  try {
    await member.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;

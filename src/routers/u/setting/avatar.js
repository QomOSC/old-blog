// import { Router } from 'express';
// import multer from 'multer';
//
// const { logged } = rootRequire('./perms');
// const { Member } = rootRequire('./models');
//
// const upload = multer({ dest: 'uploads/' });
// const router = new Router();
//
// router.post(
//   '/u/setting/avatar',
//   logged,
//   upload.single('avatar'),
//   (req, res) => {
//
//
//   console.log(req.file);
//   console.log(req.body);
//   console.log('Matin');
//
//   res.json({ type: 0 });
//   // Member.findOne({ _id: req.member.user._id }).then((member) => {
//   //   if (member) {
//   //     member.avatar
//   //   } else {
//   //     // User not Found
//   //     res.json({ type: 2, text: 0 });
//   //   }
//   // }).catch(() => {
//   //   // Error
//   //   res.json({ type: 2, text: 1 });
//   // });
// });
//
// export default router;

import { Router } from 'express';

const { Member } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.post('/u/setting/password', logged, async(req, res) => {

  const member = await Member.findOne({ _id: req.member.user._id });

  if (req.body.password !== crypt.decrypt(member.password, member.email)) {
    // Wrong Old Password
    res.json({ type: 2, text: 1 });
    return;
  }

  member.password = crypt.encrypt(req.body.newpassword, member.email);

  try {
    await member.save();
    // OK
    res.json({ type: 0 });
  } catch (e) {
    // Error
    res.json({ type: 2, text: 0 });
    return;
  }  
});

export default router;

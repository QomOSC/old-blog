import { Router } from 'express';

const { Member, Recovery } = rootRequire('./models');
const { login } = rootRequire('./perms');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.post('/recovery/change', login, async(req, res) => {
  if (!req.body.token || !req.body.password) {
    // Not complete values
    res.json({ type: 2, text: 1 });
    return;
  }

  const rec = await Recovery.findOne({ token: req.body.token });

  if (!rec) {
    // Wrong token
    res.json({ type: 2, text: 0 });
    return;
  }

  const member = await Member.findOne({ _id: rec.member });

  if (!member) {
    // Error
    res.json({ type: 2, text: 2 });
    return;
  }

  member.password = crypt.encrypt(req.body.password, member.email);

  try {
    await member.save();
    await rec.remove();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 2 });
  }
});

export default router;

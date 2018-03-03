import { Router } from 'express';

const { Member } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

function checkUsername(req) {
  return new Promise(async(resolve, reject) => {

    const newUsername = await Member.findOne({ username: req.body.username });

    if (newUsername) {
      if (newUsername.username === req.member.user.username) {
        // Username OK
        resolve(1);
      } else {
        // Taken Username
        reject({ type: 2, text: 3 });
      }
    } else {
      // Username OK
      resolve(1);
    }
  });
}

async function setNewValues(req, res) {

  const member = await Member.findOne({ _id: req.member.user._id });

  member.fname = req.body.fname;
  member.lname = req.body.lname;
  member.email = req.body.email;
  member.username = req.body.username;
  member.description = req.body.description;

  try {
    await member.save();
    // OK
    res.json({ type: 0 });
  } catch (e) {
    // Error
    res.json({ type: 2, text: 2 });
  }
}

router.get('/u/setting', logged, (req, res) => {
  res.render('u/setting/setting.njk');
});

router.post('/u/setting', logged, async(req, res) => {
  if (!req.body.email ||
      !req.body.fname ||
      !req.body.lname ||
      !req.body.username) {

    // Undefined values
    res.json({ type: 2, text: 1 });
    return;
  }

  req.body.email = req.body.email.toLowerCase();
  req.body.username = req.body.username.toLowerCase();

  const newEmail = await Member.findOne({ email: req.body.email });

  if (!newEmail) {
    // Email OK
    checkUsername(req).then(() => {
      // Username OK
      setNewValues(req, res);
    }).catch(e => {
      res.json(e);
    });
    return;
  }

  if (newEmail.email !== req.member.user.email) {
    // Taken Email
    res.json({ type: 2, text: 0 });
    return;
  }
  
  // Email OK
  checkUsername(req).then(() => {
    // Username OK
    setNewValues(req, res);
  }).catch(e => {
    res.json(e);
  });
});

export default router;

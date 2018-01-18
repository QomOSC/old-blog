import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

function checkUsername(req) {
  return new Promise((resolve, reject) => {
    Member.findOne({ username: req.body.username }).then(newUsername => {
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
  });
}

function setNewValues(req, res) {
  console.log(req.body);
  Member.findOne({ _id: req.member.user._id }).then(member => {
    member.fname = req.body.fname;
    member.lname = req.body.lname;
    member.email = req.body.email;
    member.username = req.body.username;

    if (req.body.description) {
      member.description = req.body.description;
    }

    member.save().then(() => {
      // All good
      res.json({ type: 0 });
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 2 });
    });
  }).catch(() => {
    // Error
    res.json({ type: 2, text: 2 });
  });
}

router.get('/u/setting', logged, (req, res) => {
  res.render('u/setting/setting.njk', { member: req.member.user });
});

router.post('/u/setting', logged, (req, res) => {
  if (req.body.email &&
      req.body.fname &&
      req.body.lname &&
      req.body.username) {

    req.body.email = req.body.email.toLowerCase();
    req.body.username = req.body.username.toLowerCase();

    Member.findOne({ email: req.body.email }).then(newEmail => {
      if (newEmail) {
        if (newEmail.email === req.member.user.email) {
          // Email OK
          checkUsername(req).then(() => {
            // Username OK
            setNewValues(req, res);
          }).catch(e => {
            res.json(e);
          });
        } else {
          // Taken Email
          res.json({ type: 2, text: 0 });
        }
      } else {
        // Email OK
        checkUsername(req).then(() => {
          // Username OK
          setNewValues(req, res);
        }).catch(e => {
          res.json(e);
        });
      }
    });
  } else {
    // Undefined values
    res.json({ type: 2, text: 1 });
  }
});

export default router;

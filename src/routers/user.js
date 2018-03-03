import { Router } from 'express';

const { Member, Article } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/user/:username', async(req, res) => {
  req.params.username = req.params.username.toLowerCase();

  const member = await Member.findOne({ username: req.params.username });

  if (!member) {
    res.reply.notFound();
    return;
  }

  const user = [];

  user.push({
    _id: member._id,
    fname: member.fname,
    lname: member.lname,
    type: member.type,
    createdAt: moment(member.createdAt),
    email: member.email,
    username: member.username,
    description: member.description,
    avatar: member.avatar,
    postsLength: member.articles.length
  });

  const articles = await Article
    .find({ author: member._id })
    .limit(12)
    .sort({ createdAt: -1 });

  const allArts = [];

  for (const i of articles) {
    const oneArt = {};

    let content = i.content.split('').slice(0, 110);
    content.push('.', '.', '.');
    content = content.join('');

    oneArt.id = i._id;
    oneArt.title = i.title;
    oneArt.content = content;
    oneArt.minutes = i.minutes;
    oneArt.avatar = i.avatar;
    oneArt.viewers = i.viewers.length;
    oneArt.likes = i.likes.length;

    allArts.push(oneArt);
  }

  user.push(allArts);

  res.render('user.njk', {
    member: user[0],
    posts: user[1]
  });
});

export default router;

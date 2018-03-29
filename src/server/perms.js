import User from './models/User';


const login = (req, res, next) => {
  req.session.user ? res.json({ type: 3 }) : next();
};

const logged = (req, res, next) => {
  req.session.user ? next() : res.json({ type: 3 });
};

const admin = async (req, res, next) => {
  const user = await User.findById(req.session.user);

  user.type >= 3 ? next() : res.json({ type: 3 });
};

const god = async (req, res, next) => {
  const user = await User.findById(req.session.user);

  user.type === 4 ? next() : res.json({ type: 3 });
};


export default {
  logged,
  login,
  admin,
  god
};

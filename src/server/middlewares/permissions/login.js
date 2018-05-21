export default (req, res, next) => {
  req.session.user ? res.json({ type: 3 }) : next();
};

export default (req, res, next) => {
  req.session.user ? next() : res.json({ type: 3 });
};

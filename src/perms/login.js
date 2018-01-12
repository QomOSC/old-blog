export default (req, res, next) => {
  req.member.logged() ? res.redirect('/') : next();
};

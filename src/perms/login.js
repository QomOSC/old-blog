// If Member has logged, then he can't use this router
export default (req, res, next) => {
  req.member.logged() ? res.redirect('/u') : next();
};

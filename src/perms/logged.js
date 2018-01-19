// If Member has logged, then he can use this router
export default (req, res, next) => {
  req.member.logged() ? next() : res.redirect('/');
};

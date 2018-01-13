export default (req, res, next) => {
  req.member.logged() ? next() : res.redirect('/u');
};

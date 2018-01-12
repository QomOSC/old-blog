export default (req, res, next) => {
  req.member.user.type >= 2 ? next() : res.reply.forbidden();
};

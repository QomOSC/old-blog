export default ([req, res], message) => {
  res.status(403);

  res.render('replies/403.njk', {
    title: 'Forbidden',
    member: req.member.user,
    message
  });
};

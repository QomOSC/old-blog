export default ([req, res], message) => {
  res.status(403);

  res.render('replies/403.njk', {
    title: 'Forbidden',
    logged: req.member.user,
    message
  });
};

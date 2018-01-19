export default ([req, res], message) => {
  res.status(500);

  res.render('replies/500.njk', {
    title: 'Error',
    logged: req.member.user,
    message
  });
};

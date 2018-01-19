export default ([req, res], message) => {
  res.status(500);

  res.render('replies/500.njk', {
    title: 'Error',
    member: req.member.user,
    message
  });
};

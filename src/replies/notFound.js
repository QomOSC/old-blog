export default ([req, res], message) => {
  res.status(404);

  res.render('replies/404.njk', {
    title: 'Not Found',
    member: req.member.user,
    message
  });
};

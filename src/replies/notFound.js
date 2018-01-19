export default ([req, res], message) => {
  res.status(404);

  res.render('replies/404.njk', {
    title: 'Not Found',
    logged: req.member.user,
    message
  });
};

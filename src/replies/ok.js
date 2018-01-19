export default ([req, res], message) => {
  res.status(200);

  res.render('replies/200.njk', {
    title: 'OK',
    member: req.member.user,
    message
  });
};

export default (res, message) => {
  res.status(403);

  res.render('replies/403.njk', { message, title: 'Forbidden' });
};

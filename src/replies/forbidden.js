export default (res, message) => {
  res.status(403);

  res.render('403.njk', { message, title: 'Forbidden' });
};

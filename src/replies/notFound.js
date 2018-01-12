export default (res, message) => {
  res.status(404);

  res.render('replies/404.njk', { message, title: 'Not Found' });
};

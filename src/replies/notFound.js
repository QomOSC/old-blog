export default (res, message) => {
  res.status(404);

  res.render('404.njk', { message, title: 'Not Found' });
};

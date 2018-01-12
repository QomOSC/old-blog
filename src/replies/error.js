export default (res, message) => {
  res.status(500);

  res.render('replies/500.njk', { message, title: 'Error' });
};

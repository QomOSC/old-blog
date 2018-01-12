export default (res, message) => {
  res.status(500);

  res.render('500.njk', { message, title: 'Error' });
};

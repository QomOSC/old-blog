export default (res, message) => {
  res.status(200);

  res.render('replies/200.njk', { message, title: 'OK' });
};

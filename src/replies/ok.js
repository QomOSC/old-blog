export default (res, message) => {
  res.status(200);

  res.render('200.njk', { message, title: 'OK' });
};

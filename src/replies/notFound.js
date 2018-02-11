export default res => {
  res.status(404);

  res.render('replies/404.njk');
};

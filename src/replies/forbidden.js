export default res => {
  res.status(403);

  res.render('replies/403.njk');
};

export default requirements => (req, res, next) => {
  for (const requirement of requirements) {
    if (!(requirement in req.body)) {
      res.json({ type: 4 });

      return;
    }
  }

  next();             
};

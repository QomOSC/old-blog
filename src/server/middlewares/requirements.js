import sanitize from 'mongo-sanitize';

export default requirements => (req, res, next) => {
  for (const requirement of requirements) {

    if (requirement in req.body) {
      req.body[requirement] = sanitize(req.body[requirement]);
    }

    else {
      res.json({ type: 4 });

      return;
    }

  }

  next();
};

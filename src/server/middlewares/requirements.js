import sanitize from 'mongo-sanitize';

export default requirements => (req, res, next) => {
  for (const requirement of requirements) {
    if (requirement in req.body) {
      req.body[requirement] = sanitize(req.body[requirement]);

      if (typeof req.body[requirement] === 'object') {
        req.body[requirement] = JSON.stringify(req.body[requirement]);
      }
    }
    else {
      return res.json({ type: 4 });
    }
  }

  next();
};

import User from 'Root/models/User';

export default (query, one = false) => new Promise(async res => {
  if (one) {
    try {
      const user = await User
      .findOne(query)
      .select('-password -__v -submembers')
      .lean();

      if (user) {
        user.articles = user.articles.length;
      }

      res(user);
    }
    catch (e) {
      res({});
    }
  }

  else {
    try {
      const users = await User
      .find(query)
      .select('-password -__v -submembers')
      .lean();

      for (const [i, v] of users.entries()) {
        users[i] = {
          ...v,
          articles: v.articles.length
        };
      }

      res(users);
    }
    catch (e) {
      res([]);
    }
  }
});

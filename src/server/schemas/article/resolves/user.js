import User from 'Root/models/User';

const resolve = async parent => {
  let user = await User
    .findOne({ _id: parent.author })
    .select('-password -submembers -__v')
    .lean();

  if (user) {
    user = {
      ...user,
      articles: user.articles.length
    };
  }

  return user;
};

export default resolve;

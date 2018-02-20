const { Newsletter } = rootRequire('./models');

const removeUserNews = email =>
  new Promise(async(resolve, reject) => {
    const userNews = await Newsletter.find({ email });

    if (userNews.length !== 0) {
      userNews.remove().then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    } else { resolve(); }
  });

export default removeUserNews;

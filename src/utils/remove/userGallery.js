const { Gallery } = rootRequire('./models');

const removeUserGals = id =>
  new Promise(async(resolve, reject) => {
    const userGals = await Gallery.find({ photographer: id });

    if (userGals.length !== 0) {
      userGals.remove().then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    } else { resolve(); }
  });

export default removeUserGals;

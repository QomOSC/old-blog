const { Conference } = require('../../models');

const removeUserConfs = id =>
  new Promise(async(resolve, reject) => {
    const userConfs = await Conference.find({ provider: id });

    if (userConfs.length !== 0) {
      userConfs.remove().then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    } else { resolve(); }
  });

export default removeUserConfs;

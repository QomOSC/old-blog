export default function(id, Conference) {
  return new Promise(async(resolve, reject) => {
    const userConfs = await Conference.find({ provider: id });

    if (userConfs.length !== 0) {
      Conference.remove({ provider: id }).then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    } else { resolve(); }
  });
}

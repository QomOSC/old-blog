export default function(id, Gallery) {
  return new Promise(async(resolve, reject) => {
    const userGals = await Gallery.find({ photographer: id });

    if (userGals.length !== 0) {
      Gallery.remove({ photographer: id }).then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    } else { resolve(); }
  });
}

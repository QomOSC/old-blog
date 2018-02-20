export default function(email, Newsletter) {
  return new Promise(async(resolve, reject) => {
    const userNews = await Newsletter.find({ email });

    if (userNews.length !== 0) {
      Newsletter.remove({ email }).then(() => {
        resolve();
      }).catch(() => {
        reject();
      });
    } else { resolve(); }
  });
}

export default function(id, Article, Tag, removeImage) {
  return new Promise(async(resolve, reject) => {
    const userArticles = await Article.find({ author: id });

    if (userArticles.length !== 0) {
      function* getResponse() {
        for (const i of userArticles) {
          yield new Promise(async resolv => {
            await Tag.remove({ article: i._id });
            await removeImage(i.avatar);

            resolv();
          });
        }
      }

      const iterator = getResponse();
      (function loop() {

        const next = iterator.next();
        if (next.done) {
          Article.remove({ author: id }).then(() => {
            resolve();
          }).catch(() => {

            reject();
          });
          return;
        }

        next.value.then(loop);
      })();
    } else { resolve(); }
  });
}

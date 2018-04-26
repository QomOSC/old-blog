import Conference from 'Root/models/Conference';

import removeImage from 'Root/utils/removeImage';

export default id => new Promise(async (res, rej) => {
  try {
    const conferences = await Conference.find({ author: id });

    for (const i of conferences) {

      for (const j of i.galleries) {
        await removeImage(j);
      }

      await i.remove();
    }

    res();
  }

  catch (e) {
    rej();
  }
});

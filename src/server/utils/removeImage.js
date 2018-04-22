import { resolve } from 'path';
import { unlink } from 'fs';

import { uploadDir } from 'Root/config';

export default img => new Promise((res, rej) => {
  unlink(resolve(uploadDir, img), err => {
    if (err) {
      rej();

      return;
    }

    res();
  });
});

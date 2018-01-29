import fs from 'fs';
import path from 'path';


function removeImg(name) {
  return new Promise((resolve, reject) => {
    const p = path.resolve(__dirname, '../../uploads', name);

    fs.unlink(p, err => {
      if (err) {
        reject(err);
      } else {
        resolve(name);
      }
    });

  });
}

export default removeImg;

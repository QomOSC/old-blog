import fs from 'fs';
import path from 'path';


function removeImg(name) {
  const p = path.resolve(__dirname, '../../uploads', name);

  fs.unlinkSync(p);
}

export default removeImg;

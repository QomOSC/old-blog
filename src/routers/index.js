import fs from 'fs';
import { resolve } from 'path';


function getRouters(dir) {
  let result = [];
  let files = fs.readdirSync(dir);


  for (let file of files) {
    if (file !== 'index.js') {
      fs.lstatSync(resolve(dir, file)).isFile() ?
      result.push(resolve(dir, file)) :
      result.push(...getRouters(resolve(dir, file)));
    }
  }

  return result;
}

let files = getRouters(__dirname);
let routers = [];

for (let file of files) {
  routers.push(require(file));
}

export default routers;

import crypto from 'crypto';


function randomString() {
  return new Promise((resolve, reject) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) {
        reject(err);
      } else {
        const r = raw.toString('hex') + Date.now();
        resolve(r);
      }
    });
  });
}

export default randomString;

import crypto from 'crypto';

export default (length = 16) => new Promise((resolve, reject) => {
  crypto.pseudoRandomBytes(length, (err, raw) => {
    if (err) {
      reject(err);
    } else {
      const r = raw.toString('hex') + Date.now();
      resolve(r);
    }
  });
});

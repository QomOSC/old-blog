import crypto from 'crypto';

export default (length = 16) => new Promise((resolve, reject) => {
  crypto.pseudoRandomBytes(length, (err, raw) => {
    if (err) {
      reject();

      return;
    }

    resolve(raw.toString('hex') + Date.now());
  });
});

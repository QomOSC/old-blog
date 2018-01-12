import { AES, enc } from 'crypto-js';

export const encrypt = (text, key) =>
  AES.encrypt(text, `dv{qTQTUchuw<gthisisit*${key}`).toString();

export const decrypt = (text, key) =>
  AES.decrypt(text, `dv{qTQTUchuw<gthisisit*${key}`).toString(enc.Utf8);

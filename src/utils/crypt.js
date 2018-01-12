import { AES, enc } from 'crypto-js';

export const encrypt = (text, key) =>
  AES.encrypt(text, `dv{qTQTUchuw<g*${key}`).toString();

export const decrypt = (text, key) =>
  AES.decrypt(text, `dv{qTQTUchuw<g*${key}`).toString(enc.Utf8);

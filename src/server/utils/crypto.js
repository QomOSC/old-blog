import { createHmac } from 'crypto';

export const hmac = (text, key) =>
  createHmac('sha512', key).update(text).digest('hex');

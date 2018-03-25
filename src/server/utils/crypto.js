import { createHmac } from 'crypto';

export const hmac = (text, key) => {
  let hmac = createHmac('sha512', key);
  hmac.update(text);
  return hmac.digest('hex');
};

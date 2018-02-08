import RateLimit from 'express-rate-limit';

const limit = new RateLimit({
  windowMs: 60 * 60 * 1000 * 2,
  delayAfter: 1,
  delayMs: 1000,
  max: 10,
  message: 'درخواست بیش از حد، بعدا امتحان کنید'
});

export default limit;

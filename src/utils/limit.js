import RateLimit from 'express-rate-limit';

const limit = new RateLimit({
  windowMs: 60 * 60 * 1000 * 2,
  delayAfter: 0,
  delayMs: 200,
  max: 50,
  message: 'درخواست بیش از حد، بعدا امتحان کنید'
});

export default limit;

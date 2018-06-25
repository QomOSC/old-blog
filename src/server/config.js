import { resolve } from 'path';

export default {
  dbkey: process.env.SECRET_KEY || 'Me1vfSudFwiPqhl78yRbTA1kW9VoIZ',
  url: process.env.EXTERNAL_URL || 'http://localhost:8080',
  db: process.env.DB || 'mongodb://localhost/qomosc',
  uploadDir: resolve(__dirname, 'static/uploads'),
  otkey: 'l4E7MDeLCt3SbrIoY2UHWBiONVh9f1RPGvg',
  emailAddress: 'oscqom@gmail.com',
  emailPassword: '6UBhVbueFh95eNbs',
  title: 'QOM OSC',
  port: '8080'
};

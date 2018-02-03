import { createTransport } from 'nodemailer';

function send(to) {
  return new Promise((resolve, reject) => {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: 'oscqom@gmail.com',
        pass: 'qomoscqomosc'
      }
    });

    const mailOption = {
      from: 'oscqom@gmail.com',
      subject: 'Your request accepted',
      html: `Unfortunately, your account in
Qom OSC community has been deleted by the admins.`,
      to
    };

    transport.sendMail(mailOption, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default send;

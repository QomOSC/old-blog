import { createTransport } from 'nodemailer';

function send(to, link) {
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
      subject: 'Unsubscribe',
      html: `<a href="@@LINK@@/unsubscribe/${link}">Unsubscribe</a>`,
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

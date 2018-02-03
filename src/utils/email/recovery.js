import { createTransport } from 'nodemailer';

function send(to, link) {
  return new Promise((resolve, reject) => {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: '@@EMAILADDRESS@@',
        pass: '@@EMAILPASSWORD@@'
      }
    });

    const mailOption = {
      from: '@@EMAILADDRESS@@',
      subject: 'Password Recovery',
      html: `<a href="@@LINK@@/recovery/${link}">Recovery</a>`,
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

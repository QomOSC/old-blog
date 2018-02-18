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
      subject: 'New article in QOM OSC',
      html: `<a href="@@LINK@@/article/${link}">View article</a>
      <br>
      <a href="@@LINK@@/unsubscribe/">Unsubscribe</a>`,
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

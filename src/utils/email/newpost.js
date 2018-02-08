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
      subject: 'New Post in QOM OSC',
      html: `<a href="@@LINK@@/viewpost/${link}">View post</a>
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

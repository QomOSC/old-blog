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
    const contact = '<a href="@@LINK@@/contact/">View Comment</a>';
    const article = `<a href="@@LINK@@/article/${link}">View Article</a>`;

    let html = `Look who answered your comment: ${link ? article : contact}`;

    const mailOption = {
      from: 'oscqom@gmail.com',
      subject: 'Someone Answered Your Comment',
      html,
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

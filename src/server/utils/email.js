import { createTransport } from 'nodemailer';

import { emailAddress, emailPassword } from 'Root/config';

const transport = createTransport({
  service: 'gmail',
  auth: {
    user: emailAddress,
    pass: emailPassword
  }
});

export default option => new Promise((resolve, reject) => {
  transport.sendMail(
    {
      from: `QOM OSC <${emailAddress}>`,
      ...option
    },
    err => {
      if (err) {
        reject();
        return;
      }

      resolve();
    }
  );
});

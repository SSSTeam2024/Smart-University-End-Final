const nodemailer = require("nodemailer");

const sendEmail = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mouafekhedfi@gmail.com",
          pass: "lwzd fdcr sclt cwfo",
        },
      });

      const mailOptions = {
        from: {
          name: "ENI Smart University",
          address: "mouafekhedfi@gmail.com",
        },
        to: email.to,
        subject: email.subject,
        html: email.body,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve(info.response);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
};

module.exports = {
  sendEmail,
};

const nodemailer = require('nodemailer');

exports.send = async function (to, subject, content) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'acqui717@gmail.com',
      pass: 'lecuong96'
    }
  });

  const info = await transporter.sendMail({
    from: 'acqui717@gmail.com',
    to: to,
    subject: subject,
    text: content,
  });
  console.log(info);
};
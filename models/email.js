const nodemailer = require('nodemailer');

exports.send = async function (to, subject, content) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER|| 'acqui717@gmail.com',
      pass: process.env.GMAIL_PASSWORD||'lecuong96'
    }
  });

  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER|| 'acqui717@gmail.com',
    to: to,
    subject: subject,
    text: content,
  });
  console.log(info);
};
// EmailSender.js
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "cyrilmugash70@gmail.com",
    pass: "haii luet mihm hutl",
  }
});


 sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: "cyrilmugash70@gmail.com",
    to,
    subject,
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    // if (error) {
    //   console.error("Error sending email: ", error);
    // } else {
    //   console.log("Email sent: ", info.response);
    // }
  });
};

module.exports = sendEmail;
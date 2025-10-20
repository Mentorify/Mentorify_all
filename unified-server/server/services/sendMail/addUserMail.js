// Using ethereal test configuration by default. Replace with real SMTP via env when ready.
const nodemailer = require("nodemailer")

async function sendMail() {
  let testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
  let info = await transporter.sendMail({
    from: '"CareerClarify" <no-reply@careerclarify.com>',
    to: "test@example.com",
    subject: "Hello",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  })
  return info
}

module.exports = sendMail




 const nodemailer = require('nodemailer')

 const sendEmail = async()  =>{
 let testAccount = await nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "russel.schmitt55@ethereal.email",
    pass: "JTs6Eve4T7HCfz8upX",
  },
});

}
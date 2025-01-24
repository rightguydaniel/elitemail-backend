import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT), 
    secure: true, 
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const url = `${process.env.APP_URL}/verify/${token}`;
  await transporter.sendMail({
    from:`${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });
};

export const sendMailWithAttachment = async (
  name: string,
  email: string,
  pass: string,
  to: string[],
  subject: string,
  message: string,
  attachmentPath: string | null
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT), 
    secure: true, 
    auth: {
      user: email,
      pass: pass,
    },
  });
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const recipient of to) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `${name} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: recipient, // Send email individually
      subject,
      text: message,
      attachments: attachmentPath
        ? [
            {
              path: attachmentPath,
            },
          ]
        : [],
    };

    try {
      await transporter.sendMail(mailOptions); // Send the email
      console.log(`Email sent to: ${recipient}`);
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
    }

    // Introduce a delay of 1 minute (60,000 milliseconds)
    await delay(60000);
  }
};


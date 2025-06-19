import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Use `true` for port 465, `false` for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMailToUser(name, email) {
  try {
    let response =await transporter.sendMail({
    from: `"Murali" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Thanks for contacting us!",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Auto Reply</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333333;
    }
    p {
      color: #555555;
      line-height: 1.6;
    }
    a.whatsapp-link {
      color: #25D366;
      text-decoration: none;
      font-weight: bold;
    }
    .footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #888888;
      text-align: center;
    }
    @media (max-width: 600px) {
      .email-container {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>Thanks for reaching out!</h2>
    <p>Hi ${name},</p>
    <p>Thanks for your message. I’ve received your inquiry and will get back to you as soon as possible.</p>
    <p>If your message is urgent, feel free to contact me directly on <a href="https://wa.me/919941161100?text=Hi%20Murali%2C%20I%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20your%20work.%20Can%20we%20talk%3F" class="whatsapp-link" target="_blank">WhatsApp</a>.</p>
    <p>Meanwhile, feel free to explore my <a href="https://murali-portfolio-amber.vercel.app/" target="_blank">Projects</a>.</p>
    <p>Best regards,<br />
    <strong>Murali Dharan</strong><br />
    Front-End Developer</p>
    <div class="footer">
      © 2025 Murali Dharan. All rights reserved.
    </div>
  </div>
</body>
</html>

    `,
  });

  console.log('Mail to User sent',response)
  } catch (error) {
    console.error('Mail to user Failed: ', error)
  }
  
}

export async function sendMailToCompany(name, email, message) {
  try{
    let response = await transporter.sendMail({
    from: `"Website Bot" <${process.env.FROM_EMAIL}>`,
    to: process.env.COMPANY_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Message Received</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      }
      h2 {
        color: #333333;
      }
      p {
        color: #555555;
        margin: 10px 0;
        line-height: 1.5;
      }
      .label {
        font-weight: bold;
        color: #222;
      }
      .footer {
        margin-top: 30px;
        font-size: 0.9em;
        text-align: center;
        color: #aaaaaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>📩 New Contact Form Submission</h2>
      <p><span class="label">Name:</span> ${name}</p>
      <p><span class="label">Email:</span> ${email}</p>
      <p><span class="label">Message:</span><br />${message}</p>

      <div class="footer">
        This message was automatically sent via your website contact form.
      </div>
    </div>
  </body>
</html>

    `,
  });
  console.log('Mail to Murali sent',response)
} catch (error) {
  console.error('Mail to Murali Failed:', error)
}
}

import { EmailContent, EmailProductInfo, NotificationType } from "@/types";
import nodemailer from "nodemailer";

export const generateEmailBody = (product: EmailProductInfo, type: NotificationType) => {

  const shortenedTitle = product.title.length > 20
    ? `${product.title.substring(0, 20)}...`
    : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case "WELCOME":
      subject = `Welcome to Price Tracking for ${shortenedTitle}`;
      body = `
        <div>
          <h2>Welcome to PriceWise 🚀</h2>
          <p>You are now tracking ${product.title}.</p>
          <p>Here's an example of how you'll receive updates:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} is back in stock!</h3>
            <p>We're excited to let you know that ${product.title} is now back in stock.</p>
            <p>Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
            <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%;" />
          </div>
          <p>Stay tuned for more updates on ${product.title} and other products you're tracking.</p>
        </div>
      `;
      break;

    case "LOWEST_PRICE":
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
      break;
    default:
      throw new Error("Invalid notification type");
  }
  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  maxConnections: 1,
});

export async function sendEmail(emailContent: EmailContent, sendTo: string[]) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: sendTo,
    subject: emailContent.subject,
    html: emailContent.body,
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) return console.log(err);

    console.log("Email send ", info)
  })
}


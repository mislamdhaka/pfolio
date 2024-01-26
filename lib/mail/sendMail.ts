"use server";
import nodeMailer from "nodemailer";
import { FormSchema } from "@/app/(pages)/contact/contact-form";

export default async function sendMail(data: z.infer<typeof FormSchema>) {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USER,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      accessToken: process.env.MAIL_ACCESS_TOKEN,
      refreshToken: process.env.MAIL_REFRESH_TOKEN,
      expires: 1484314697598,
    },
  });

  const mailData = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `Message From ${data?.firstName} ${data?.lastName}`,
    text: data?.message + " | Sent from: " + data?.email,
    html: `<div>${data?.message}</div><p>Sent from: ${data?.email}</p>`,
  };

  const info = await transporter.sendMail(mailData);
  return info;
}

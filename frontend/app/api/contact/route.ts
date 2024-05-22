import { verify } from 'hcaptcha';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const secretKey = process.env.HCAPTCHA_SECRET ?? '';

export async function POST(request: NextRequest) {
  const { lastName, firstName, email, phone, object, message, token } =
    await request.json();

  const transport = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_EMAIL,
      pass: process.env.BREVO_PASS,
    },
  });

  // hCaptcha verification
  const { success } = await verify(secretKey, token);
  if (!success) {
    return NextResponse.json({ message: 'Invalid captcha' }, { status: 400 });
  }

  const mailOptions: Mail.Options = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Message de ${firstName} ${lastName} (villerslelac.fr)`,
    html: `<html><body><b>Nom&nbsp;:</b> ${firstName} ${lastName}<br/>
    <b>Email&nbsp;:</b> ${email}<br/>
    <b>Téléphone&nbsp;:</b> ${phone}<br/><br/>
    <b>Objet&nbsp;:</b> ${object}<br/>
    <p>${message.replace(/\n/g, '<br>')}<p></body></html>
  `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

import { json } from '@remix-run/node';
import type { ActionFunctionArgs } from '@remix-run/node';
import { MetaFunction } from '@remix-run/react';
import { verify } from 'hcaptcha';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { Headband } from 'app/components';

import ContactForm, { ContactFormData, validateForm } from './ContactForm';
import styles from './index.module.scss';

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  return [...parentMeta, { title: 'Contacter la mairie de Villers-le-Lac' }];
};

const sendEmail = async (data: ContactFormData) => {
  const { lastName, firstName, email, phone, object, message, captchaToken } =
    data;

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
  const secretKey = process.env.HCAPTCHA_SECRET ?? '';
  const { success } = await verify(secretKey, captchaToken ?? '');
  if (!success) {
    return json({ error: 'Invalid captcha' }, { status: 400 });
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
      transport.sendMail(mailOptions, (err: Error | null) => {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return json({ success: true });
  } catch (err) {
    console.error(err);
    return json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = Object.fromEntries(formData) as any as ContactFormData;

  const errors = validateForm(data);
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  return await sendEmail(data);
};

const Contact = () => {
  return (
    <>
      <Headband
        title="Contact"
        breadcrumb={[{ link: '/contact', label: 'Contact' }]}
      />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Contact</h3>
            <p>
              E-mail :{' '}
              <a href="mailto:etatcivil@mairie-vll.fr">
                etatcivil@mairie-vll.fr
              </a>
              <br />
              Tél : <a href="tel:+33381680377">03 81 68 03 77</a>
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Horaires</h3>
            <p>
              Le secrétariat est ouvert de 8h30 à 12h et de 13h30 à 17h30 du
              lundi au vendredi
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Adresse</h3>
            <p>
              1 Rue Pasteur
              <br />
              25130 Villers-le-Lac
            </p>
          </div>
        </div>
        <ContactForm />
      </main>
    </>
  );
};

export default Contact;

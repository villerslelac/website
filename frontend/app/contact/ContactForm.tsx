'use client';

import React, { useEffect, useRef, useState } from 'react';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import clsx from 'clsx';

import { Button } from '../components';
import styles from './ContactForm.module.scss';

interface ContactFormData {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  object: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    object: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);

  // hCaptcha
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const onCaptchaChange = (token: string) => setCaptchaToken(token);
  const onCaptchaExpire = () => setCaptchaToken(null);

  const validateForm = () => {
    let formErrors: Partial<ContactFormData> = {};
    let isValid = true;

    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.firstName.trim()) {
      formErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      formErrors.phone = 'Phone number is required';
      isValid = false;
    }

    if (!formData.object.trim()) {
      formErrors.object = 'Object is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      formErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitStatus(null);
    if (validateForm() && captchaToken) {
      const apiEndpoint = '/api/contact';
      fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          token: captchaToken,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            setSubmitted(false);
            setFormData({
              lastName: '',
              firstName: '',
              email: '',
              phone: '',
              object: '',
              message: '',
            });
            setCaptchaToken(null);
            captchaRef.current?.resetCaptcha();
          }
          setSubmitStatus(response.status);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error('Form validation failed');
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="lastName">Nom *</label>
        <input
          className={clsx(styles.input, errors.lastName && styles.error)}
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="firstName">Prénom *</label>
        <input
          className={clsx(styles.input, errors.firstName && styles.error)}
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email *</label>
        <input
          className={clsx(styles.input, errors.email && styles.error)}
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="phone">Téléphone *</label>
        <input
          className={clsx(styles.input, errors.phone && styles.error)}
          type="text"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label htmlFor="object">Objet *</label>
        <input
          className={clsx(styles.input, errors.object && styles.error)}
          type="text"
          id="object"
          value={formData.object}
          onChange={handleChange}
        />
        <label htmlFor="message">Message *</label>
        <textarea
          className={clsx(styles.input, errors.message && styles.error)}
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />
        {submitStatus === 200 ? (
          <div className={styles.alertSuccess}>
            <div className={styles.alertSuccessIcon}>
              <span className="material-symbols-rounded">check_circle</span>
            </div>
            <div className={styles.alertSuccessContent}>
              <h3 className={styles.alertSuccessTitle}>Succès de l'envoi</h3>
              <p>
                Votre message a bien été envoyé. Nous le traiterons dans les
                meilleurs délais.
              </p>
            </div>
          </div>
        ) : submitStatus ? (
          <div className={styles.alertError}>
            <div className={styles.alertErrorIcon}>
              <span className="material-symbols-rounded">cancel</span>
            </div>
            <div className={styles.alertErrorContent}>
              <h3 className={styles.alertErrorTitle}>Échec de l'envoi</h3>
              <p>
                Nous n'avons pas réussi à envoyer votre message. Veuillez
                réessayer ultérieurement.
              </p>
            </div>
          </div>
        ) : null}
        <div className={styles.submit}>
          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? ''}
            onVerify={onCaptchaChange}
            onExpire={onCaptchaExpire}
          />
          <Button>Envoyer</Button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;

import React, { useEffect, useRef, useState } from 'react';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useFetcher } from '@remix-run/react';
import clsx from 'clsx';

import { Button } from 'app/components';
import { useRootContext } from 'app/utils/useRootContext';

import styles from './ContactForm.module.scss';

export interface ContactFormData {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  object: string;
  message: string;
  captchaToken?: string;
}

export const validateForm = (formData: ContactFormData) => {
  const formErrors: Partial<ContactFormData> = {};

  if (!formData.lastName?.trim()) {
    formErrors.lastName = 'Last name is required';
  }

  if (!formData.firstName?.trim()) {
    formErrors.firstName = 'First name is required';
  }

  if (!formData.email?.trim()) {
    formErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    formErrors.email = 'Email is invalid';
  }

  if (!formData.phone?.trim()) {
    formErrors.phone = 'Phone number is required';
  }

  if (!formData.object?.trim()) {
    formErrors.object = 'Object is required';
  }

  if (!formData.message?.trim()) {
    formErrors.message = 'Message is required';
  }

  return formErrors;
};

const ContactForm = () => {
  const { hCaptchaSiteKey } = useRootContext();
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();
  const fetcherData = fetcher.data as
    | { success?: boolean; error?: boolean }
    | undefined;

  useEffect(() => {
    if (fetcherData?.success) {
      formRef.current?.reset();
    }
  }, [fetcherData]);

  // hCaptcha
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const onCaptchaChange = (token: string) => setCaptchaToken(token);
  const onCaptchaExpire = () => setCaptchaToken(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const formData: Partial<ContactFormData> = { [name]: value };
    const err: Record<string, string> = validateForm(
      formData as ContactFormData,
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: err[name] || undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      lastName: form.lastName.value,
      firstName: form.firstName.value,
      email: form.email.value,
      phone: form.phone.value,
      object: form.object.value,
      message: form.message.value,
    } as ContactFormData;

    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0 && Boolean(captchaToken)) {
      fetcher.submit(
        {
          ...formData,
          captchaToken: captchaToken,
        },
        { method: 'POST' },
      );
    }
  };

  return (
    <fetcher.Form
      ref={formRef}
      className={styles.form}
      method="post"
      onSubmit={handleSubmit}
    >
      <label htmlFor="lastName">Nom *</label>
      <input
        className={clsx(styles.input, errors.lastName && styles.error)}
        type="text"
        id="lastName"
        name="lastName"
        onChange={handleChange}
      />
      <label htmlFor="firstName">Prénom *</label>
      <input
        className={clsx(styles.input, errors.firstName && styles.error)}
        type="text"
        id="firstName"
        name="firstName"
        onChange={handleChange}
      />
      <label htmlFor="email">Email *</label>
      <input
        className={clsx(styles.input, errors.email && styles.error)}
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
      />
      <label htmlFor="phone">Téléphone *</label>
      <input
        className={clsx(styles.input, errors.phone && styles.error)}
        type="text"
        id="phone"
        name="phone"
        onChange={handleChange}
      />
      <label htmlFor="object">Objet *</label>
      <input
        className={clsx(styles.input, errors.object && styles.error)}
        type="text"
        id="object"
        name="object"
        onChange={handleChange}
      />
      <label htmlFor="message">Message *</label>
      <textarea
        className={clsx(styles.input, errors.message && styles.error)}
        id="message"
        name="message"
        onChange={handleChange}
        rows={5}
      />
      {fetcherData?.success ? (
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
      ) : fetcherData?.error ? (
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
          sitekey={hCaptchaSiteKey}
          onVerify={onCaptchaChange}
          onExpire={onCaptchaExpire}
        />
        <Button type="submit" disabled={fetcher.state !== 'idle'}>
          Envoyer
        </Button>
      </div>
    </fetcher.Form>
  );
};

export default ContactForm;

'use server';

import React from 'react';

import { Metadata } from 'next';

import { Headband } from '../components';
import ContactForm from './ContactForm';
import styles from './page.module.scss';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Contacter la mairie de Villers-le-Lac',
  };
};

const Contact = async () => {
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
              E-mail : <a href="#">etatcivil@mairie-vll.fr</a>
              <br />
              Tél : <a href="#">03 81 68 03 77</a>
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

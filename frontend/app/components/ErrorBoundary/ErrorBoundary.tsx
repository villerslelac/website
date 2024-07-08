import { Link, isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { Headband } from '../Headband/Headband';
import styles from './ErrorBoundary.module.scss';

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Headband title="Page non trouvée" />
        <main className={styles.main}>
          <h2 className={styles.status}>404</h2>
          <h3 className={styles.title}>
            La page que vous cherchez est introuvable.
          </h3>
          <p className={styles.desc}>
            Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle
            est correcte.
            <br />
            La page n'est peut-être plus disponible.
          </p>
          <Link to="/" className={styles.link}>
            Revenir à l'accueil
          </Link>
        </main>
      </>
    );
  }

  return <MainErrorBoundary />;
};

export const MainErrorBoundary = () => {
  return (
    <>
      <Headband title="Erreur inattendue" />
      <main className={styles.main}>
        <h2 className={styles.status}>500</h2>
        <h3 className={styles.title}>
          Désolé, le service rencontre un problème, nous travaillons pour le
          résoudre le plus rapidement possible.
        </h3>
        <p className={styles.desc}>
          Essayez de rafraîchir la page ou bien ressayez plus tard.
          <br />
          Si vous avez besoin d'une aide immédiate, merci de nous contacter.
        </p>
      </main>
    </>
  );
};

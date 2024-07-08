import { readItem } from '@directus/sdk';
import '@material-symbols/font-400';
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react';

import { Footer, Header, MainErrorBoundary } from 'app/components';
import 'app/styles/main.scss';
import { Menu } from 'app/types';
import directus from 'app/utils/directus';

import { RootContext } from './utils/useRootContext';

export const meta: MetaFunction = () => [
  {
    title: 'Ville de Villers-le-Lac',
  },
  {
    name: 'description',
    content:
      'Retrouvez tous les services et démarches, les infos pratiques, les actualités et événements de la Ville de Villers-le-Lac.',
  },
];

const getMenu = async () => {
  try {
    const menu = await directus.request(readItem('menu', 1));
    return menu as Menu;
  } catch (error) {
    return { items: [] };
  }
};

export const loader = async () => {
  const menu = await getMenu();
  return json({
    menu,
    env: {
      DIRECTUS_URL: process.env.DIRECTUS_URL,
      HCAPTCHA_SITEKEY: process.env.HCAPTCHA_SITEKEY,
    },
  });
};

export const App = () => {
  const { menu, env } = useLoaderData<typeof loader>();

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Yeseva+One&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header menu={menu} />
        <RootContext.Provider
          value={{
            directusUrl: env.DIRECTUS_URL ?? '',
            hCaptchaSiteKey: env.HCAPTCHA_SITEKEY ?? '',
          }}
        >
          <Outlet />
        </RootContext.Provider>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default App;

export const ErrorBoundary = () => {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Yeseva+One&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header menu={{ items: [] }} />
        <MainErrorBoundary />
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

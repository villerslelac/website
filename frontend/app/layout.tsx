import { cache } from 'react';

import { readItem } from '@directus/sdk';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Great_Vibes, Yeseva_One } from 'next/font/google';

import { Footer, Header } from './components';
import directus from './lib/directus';
import './styles/main.scss';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cursive',
});

const yesevaOne = Yeseva_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Ville de Villers-le-Lac',
  description:
    'Retrouvez tous les services et démarches, les infos pratiques, les actualités et événements de la Ville de Villers-le-Lac.',
};

const getMenu = cache(async () => {
  try {
    const menu = await directus.request(readItem('menu', 1));
    return menu as {
      items: {
        label: string;
        link: string;
        items?: {
          label: string;
          link: string;
        }[];
      }[];
    };
  } catch (error) {
    return { items: [] };
  }
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = await getMenu();

  return (
    <html lang="fr">
      <body className={clsx(yesevaOne.variable, greatVibes.variable)}>
        <Header menu={menu} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

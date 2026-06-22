import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://maison-lumera.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Maison Lumèra — Висша парфюмерия от Грас',
    template: '%s · Maison Lumèra',
  },
  description:
    'Нишови аромати, създадени на ръка в Южна Франция. Открийте Maison Lumèra — където светлината среща спомена във всяка бутилка.',
  keywords: [
    'нишови парфюми',
    'maison lumera',
    'парфюмерия Грас',
    'haute parfumerie',
    'луксозни парфюми',
    'френска парфюмерия',
  ],
  authors: [{ name: 'Maison Lumèra' }],
  creator: 'Maison Lumèra',
  publisher: 'Maison Lumèra',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: SITE_URL,
    title: 'Maison Lumèra — Висша парфюмерия от Грас',
    description:
      'Нишови аромати, създадени на ръка в Южна Франция. Четири композиции, четири часа от деня.',
    siteName: 'Maison Lumèra',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Maison Lumèra — Haute Parfumerie de Grasse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison Lumèra — Висша парфюмерия от Грас',
    description:
      'Нишови аромати, създадени на ръка в Южна Франция.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Maison Lumèra',
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  description:
    'Нишова парфюмерийна къща в Грас, Франция. Основана 1948. Четири композиции годишно, в партиди от 400 бутилки.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '14 rue des Jasmins',
    addressLocality: 'Grasse',
    postalCode: '06130',
    addressCountry: 'FR',
  },
  foundingDate: '1948',
  foundingLocation: 'Grasse, France',
  sameAs: [
    'https://www.instagram.com/maisonlumera',
    'https://www.pinterest.com/maisonlumera',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Maison Lumèra',
  url: SITE_URL,
  inLanguage: 'bg',
  publisher: {
    '@type': 'Organization',
    name: 'Maison Lumèra',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans bg-cream text-espresso grain antialiased">
        {children}
      </body>
    </html>
  );
}

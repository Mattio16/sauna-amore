import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Sauna Amore | Saune e Vasche Idromassaggio Nordiche Premium',
  description:
    'Sauna Amore - Saune a botte, vasche idromassaggio e bagni di ghiaccio dalla tradizione baltica. Vendita e noleggio nelle Marche, Italia. Prezzi competitivi, qualità premium.',
  keywords:
    'sauna, sauna botte, barrel sauna, vasca idromassaggio, hot tub, bagno ghiaccio, ice bath, Marche, Italia',
  openGraph: {
    title: 'Sauna Amore | Nordic Wellness Premium',
    description: 'Premium barrel saunas, hot tubs and ice baths from the Baltic tradition. Sales and rental in Le Marche, Italy.',
    url: 'https://www.saunaamore.it',
    siteName: 'Sauna Amore',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

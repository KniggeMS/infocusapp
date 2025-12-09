import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AppLayout } from '@/components/AppLayout';
import { NextIntlClientProvider } from 'next-intl';

// Statically import messages to ensure they are included in the build
import enMessages from '../../messages/en.json';
import deMessages from '../../messages/de.json';

const allMessages = {
  en: enMessages,
  de: deMessages
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Infocus App',
  description: 'Cross-platform media tracking',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Select the correct messages based on the locale
  // Type assertion ensures TypeScript that locale is a valid key
  const messages = allMessages[locale as keyof typeof allMessages];

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppLayout>{children}</AppLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

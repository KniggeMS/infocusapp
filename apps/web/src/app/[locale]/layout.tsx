import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AppLayout } from '@/components/AppLayout';
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/contexts/AuthContext'; // Import AuthProvider
import { LanguageProvider } from '@/contexts/LanguageContext'; // Import LanguageProvider

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
  const messages = allMessages[locale as keyof typeof allMessages];

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider>
            <AuthProvider>
              {/* We remove AppLayout from here, as it will be handled on a per-page basis */}
              {children}
            </AuthProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

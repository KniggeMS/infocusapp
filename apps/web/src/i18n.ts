import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
const locales = ['en', 'de'];

import enMessages from './messages/en.json';
import deMessages from './messages/de.json';

const messages = {
  en: enMessages,
  de: deMessages
};
 
export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) {
    notFound();
  }
 
  return {
    locale: locale as string,
    messages: messages[locale as keyof typeof messages]
  };
});
import { useTranslations } from 'next-intl';

import Link from 'next/link';

const LoginPage = () => {
  const t = useTranslations('LoginPage');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">{t('title')}</h1>
        </div>

        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground" htmlFor="email">
              {t('email_label')}
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="email"
              placeholder={t('email_placeholder')}
              type="email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground" htmlFor="password">
              {t('password_label')}
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="password"
              placeholder={t('password_placeholder')}
              type="password"
            />
          </div>

          <button className="w-full py-2 font-bold text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            {t('submit')}
          </button>
        </form>
        <div className="text-center text-muted-foreground">
          {t('register_link_text')}{' '}
          <Link className="font-medium text-primary hover:underline" href="/register">
            {t('register_link')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

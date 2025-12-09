
"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import Image from 'next/image';

const RegisterPage = () => {
  const t = useTranslations('RegisterPage');

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: "url('/login-bg.jpg')",
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher variant="glass" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="mb-6 text-center">
          <Image 
            src="/logo.svg"
            alt="CineLog Logo"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h1 className="text-5xl font-bold text-white">{t('title')}</h1>
          <p className="mt-2 text-slate-300">{t('subtitle')}</p>
        </div>

        {/* Registration Form Container */}
        <div className="w-full p-8 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10">
          <form className="space-y-4">

            <div>
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase" htmlFor="username">
                {t('username_label')}
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-white bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                id="username"
                placeholder={t('username_placeholder')}
                type="text"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase" htmlFor="email">
                {t('email_label')}
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-white bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                id="email"
                placeholder={t('email_placeholder')}
                type="email"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase" htmlFor="password">
                {t('password_label')}
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-white bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                id="password"
                placeholder={t('password_placeholder')}
                type="password"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase" htmlFor="confirm_password">
                {t('confirm_password_label')}
              </label>
              <input
                className="w-full px-4 py-3 mt-2 text-white bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                id="confirm_password"
                placeholder={t('confirm_password_placeholder')}
                type="password"
              />
            </div>

            <button className="w-full py-3 mt-2 font-bold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 transition-colors">
              {t('submit')}
            </button>
          </form>

          <div className="text-center text-slate-400 text-sm">
            {t('login_link_text')}{' '}
            <Link className="font-medium text-cyan-400 hover:underline" href="/login">
              {t('login_link')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

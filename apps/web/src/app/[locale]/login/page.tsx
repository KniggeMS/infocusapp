
"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Film, LogIn } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const LoginPage = () => {
  const t = useTranslations('LoginPage');

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: "url('/login-bg.jpg')", // PLATZHALTER: Bitte das Hintergrundbild bereitstellen
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher variant="glass" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8">
        {/* Logo */}
        <div className="mb-6 text-center">
            {/* PLATZHALTER: Bitte das Logo bereitstellen */}
          <Film className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <h1 className="text-5xl font-bold text-white">{t('title')}</h1>
          <p className="mt-2 text-slate-300">{t('subtitle')}</p>
        </div>

        {/* Login Form Container */}
        <div className="w-full p-8 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10">
          <form className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 tracking-wider uppercase" htmlFor="password">
                    {t('password_label')}
                </label>
                <Link href="#" className="text-xs text-cyan-400 hover:underline">
                    {t('forgot_password')}
                </Link>
              </div>
              <div className="relative">
                <input
                    className="w-full px-4 py-3 mt-2 text-white bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    id="password"
                    placeholder={t('password_placeholder')}
                    type="password"
                />
                {/* Das "Preview" Feature wird später hinzugefügt */}
              </div>
            </div>

            <button className="w-full py-3 font-bold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 transition-colors">
              {t('submit')}
            </button>
          </form>

          {/* Demo Login Button */}
          <button className="w-full py-3 font-bold text-slate-300 bg-slate-800/60 border border-slate-700 rounded-lg hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors flex items-center justify-center gap-2">
            <LogIn size={16} />
            {t('demo_login')}
          </button>

          <div className="text-center text-slate-400 text-sm">
            {t('register_link_text')}{' '}
            <Link className="font-medium text-cyan-400 hover:underline" href="/register">
              {t('register_link')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

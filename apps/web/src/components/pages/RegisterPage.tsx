'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/config';

const RegisterPage = () => {
  const t = useTranslations('RegisterPage');
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError(t('error_passwords_no_match'));
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        setSuccess(t('success'));
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.message || t('error_generic'));
      }
    } catch (err) {
      setError(t('error_generic'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">{t('title')}</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div>
            <label className="text-sm font-medium text-muted-foreground" htmlFor="username">
              {t('username_label')}
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="username"
              placeholder={t('username_placeholder')}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground" htmlFor="email">
              {t('email_label')}
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="email"
              placeholder={t('email_placeholder')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground" htmlFor="confirmPassword">
              {t('confirm_password_label')}
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-white bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="confirmPassword"
              placeholder={t('password_placeholder')}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {t('submit')}
          </button>
        </form>
        <div className="text-center text-muted-foreground">
          {t('login_link_text')}{' '}
          <Link className="font-medium text-primary hover:underline" href="/login">
            {t('login_link')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslations } from 'next-intl';
import { generateAvatar } from '../../../services/gemini';
import { Clapperboard, Loader2, Upload, Sparkles, Languages, UserCheck, KeyRound, ArrowLeft } from 'lucide-react';

type AuthView = 'login' | 'register' | 'forgot';

const AuthPage: React.FC = () => {
  const { login, register, resetPassword } = useAuth();
  const { language, setLanguage } = useLanguage();
  const tAuth = useTranslations('Auth');
  const tCommon = useTranslations('Common');

  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  
  // Image Gen State
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (view === 'login') {
        await login(username, password);
      } else if (view === 'register') {
        if (!username || !email || !password) throw new Error("Missing required fields");
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        if (password.length < 6) throw new Error("Password too short");

        await register({
          id: crypto.randomUUID(),
          username,
          email,
          firstName,
          lastName,
          avatar,
          createdAt: Date.now()
        }, password);
      } else if (view === 'forgot') {
          if (!username || !email || !password) throw new Error("Missing required fields");
          if (password !== confirmPassword) throw new Error("Passwords do not match");
          
          resetPassword(username, email, password);
          setSuccess(tAuth('password_reset_success'));
          setTimeout(() => {
              setView('login');
              setPassword('');
              setConfirmPassword('');
              setSuccess('');
          }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAvatar = async () => {
    if (!username) {
        setError("Please enter a username first.");
        return;
    }
    setIsGeneratingImg(true);
    const imgData = await generateAvatar(username);
    if (imgData) {
        setAvatar(imgData);
    } else {
        setError("Could not generate avatar.");
    }
    setIsGeneratingImg(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleDemoLogin = async () => {
      setIsLoading(true);
      try {
          await login('BigDaddy', 'password123');
      } catch (e) {
          setError("Demo Login Failed (User might not exist yet)");
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop" 
                alt="Cinema" 
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/50"></div>
        </div>

        <div className="absolute top-6 right-6 z-50">
            <button 
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-slate-300 text-xs font-medium transition-colors border border-white/10"
            >
                <Languages size={14} />
                {language === 'de' ? 'English' : 'Deutsch'}
            </button>
        </div>

        <div className="relative z-10 w-full max-w-md p-6">
            <div className="flex flex-col items-center mb-8">
                <div className="bg-cyan-600 p-3 rounded-2xl shadow-xl shadow-cyan-900/40 mb-4">
                    <Clapperboard size={32} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">CineLog</h1>
                <p className="text-slate-400 mt-2 text-center">
                    {view === 'login' && tAuth('login_subtitle')}
                    {view === 'register' && tAuth('register_subtitle')}
                    {view === 'forgot' && tAuth('reset_subtitle')}
                </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg text-center">
                            {success}
                        </div>
                    )}

                    {view === 'login' && (
                        <>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{tCommon('username')} / {tCommon('email')}</label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                                    placeholder={tCommon('username')}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{tCommon('password')}</label>
                                    <button 
                                        type="button" 
                                        onClick={() => { setView('forgot'); setError(''); }}
                                        className="text-xs text-cyan-400 hover:text-cyan-300"
                                    >
                                        {tAuth('forgot_password')}
                                    </button>
                                </div>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {view === 'forgot' && (
                        <>
                             <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{tCommon('username')}</label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{tCommon('email')}</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{tCommon('new_password')}</label>
                                    <input 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{tCommon('confirm_password')}</label>
                                    <input 
                                        type="password" 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {view === 'register' && (
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                             <div className="flex flex-col items-center gap-4 py-2">
                                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden flex items-center justify-center relative group">
                                    {avatar ? (
                                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-slate-500 text-xs text-center px-2">No Avatar</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        type="button" 
                                        onClick={handleGenerateAvatar}
                                        disabled={isGeneratingImg || !username}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {isGeneratingImg ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>}
                                        {isGeneratingImg ? tAuth('generating') : tAuth('generate_avatar')}
                                    </button>
                                    <label className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg cursor-pointer transition-colors">
                                        <Upload size={12} />
                                        {tAuth('or_upload')}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none"
                                    placeholder={`${tCommon('username')} *`}
                                    required
                                />
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none"
                                    placeholder={`${tCommon('email')} *`}
                                    required
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none"
                                        placeholder={`${tCommon('password')} *`}
                                        required
                                    />
                                    <input 
                                        type="password" 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none"
                                        placeholder={`${tCommon('confirm_password')} *`}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input 
                                        type="text" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none"
                                        placeholder={tCommon('firstname')}
                                    />
                                    <input 
                                        type="text" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 focus:outline-none"
                                        placeholder={tCommon('lastname')}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4 ${view === 'forgot' ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-900/20' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/20'}`}
                    >
                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                        {view === 'login' && tAuth('login_button')}
                        {view === 'register' && tAuth('register_button')}
                        {view === 'forgot' && tAuth('reset_password')}
                    </button>

                    {view === 'login' && (
                        <button 
                            type="button"
                            onClick={handleDemoLogin}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-2 text-xs uppercase tracking-wide border border-slate-600"
                        >
                            <UserCheck size={14} /> Demo Login (BigDaddy)
                        </button>
                    )}
                </form>

                <div className="mt-6 pt-6 border-t border-slate-700 text-center space-y-2">
                    {view === 'forgot' && (
                        <button 
                            onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                            className="text-slate-400 hover:text-white text-sm transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft size={14} /> {tAuth('back_to_login')}
                        </button>
                    )}
                    {view !== 'forgot' && (
                         <button 
                            onClick={() => { setView(view === 'login' ? 'register' : 'login'); setError(''); }}
                            className="text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            {view === 'login' ? tAuth('switch_to_register') : tAuth('switch_to_login')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AuthPage;

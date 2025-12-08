'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function TasteAnalysisPage() {
  const t = useTranslations('TasteAnalysis');

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
      </div>

      {/* Content Goes Here */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-300">{t('comingSoon')}</p>
      </div>
    </div>
  );
}

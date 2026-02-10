'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/landing/Footer';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function JoinPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/submit-join-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert(t('social.form_success'));
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        alert(t('social.form_error'));
      }
    } catch (err) {
      console.error(err);
      alert(t('social.form_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white animate-fade-in-fast">
      <div className="pt-32 pb-16 px-4 max-w-3xl mx-auto relative">
        <Link
          href="/social-projects"
          className="absolute top-8 left-4 md:left-0 flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase text-sm tracking-wider font-medium">{t('social.go_back')}</span>
        </Link>
        <h1 className="font-montserrat text-4xl mb-8 text-center mt-8">{t('social.join_initiative')}</h1>
        <p className="text-gray-600 text-center mb-12">
          {t('social.fill_form')}
        </p>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                {t('social.form_name')}
              </label>
              <input
                type="text"
                required
                className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                {t('social.form_phone')}
              </label>
              <input
                type="tel"
                className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              {t('social.form_email')}
            </label>
            <input
              type="email"
              className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              {t('social.form_message')}
            </label>
            <textarea
              rows={3}
              className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all resize-none bg-transparent"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-800 transition-all disabled:opacity-50"
          >
            {loading ? t('social.form_sending') : t('social.form_submit')}
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
}

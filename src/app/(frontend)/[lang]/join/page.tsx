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
    <main className="min-h-screen bg-white">
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('social.form_name')}</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                placeholder={t('social.form_placeholder_name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('social.form_phone')}</label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                placeholder={t('social.form_placeholder_phone')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('social.form_email')}</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              placeholder={t('social.form_placeholder_email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('social.form_message')}</label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              placeholder={t('social.form_placeholder_message')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 transition-colors uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? t('social.form_sending') : t('social.form_submit')}
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
}

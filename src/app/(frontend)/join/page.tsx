'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/landing/Footer';
import '../styles.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function JoinPage() {
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
            alert('Дякуємо! Ваша заявка прийнята.');
            setFormData({ name: '', phone: '', email: '', message: '' });
        } else {
            alert('Сталася помилка. Спробуйте пізніше.');
        }
    } catch (err) {
        console.error(err);
        alert('Сталася помилка. Спробуйте пізніше.');
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
            <span className="uppercase text-sm tracking-wider font-medium">Назад</span>
        </Link>
        <h1 className="font-montserrat text-4xl mb-8 text-center mt-8">Долучитися до ініціативи</h1>
        <p className="text-gray-600 text-center mb-12">
          Заповніть форму нижче, і ми зв&apos;яжемося з вами найближчим часом.
        </p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ім&apos;я</label>
              <input 
                type="text" 
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" 
                placeholder="Ваше ім&apos;я" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
              <input 
                type="tel" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" 
                placeholder="+380..." 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" 
                placeholder="example@mail.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Повідомлення</label>
            <textarea 
                rows={4} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" 
                placeholder="Я хочу долучитися до..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 transition-colors uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? 'Відправка...' : 'Відправити'}
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
}

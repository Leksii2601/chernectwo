'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, MessageCircle, Send, Phone } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t, language } = useLanguage();
  const langPrefix = `/${language.toLowerCase()}`;

  return (
    <footer id="footer" className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-24 mb-16">
          {/* Logo Section */}
          <div className="flex flex-col justify-between h-full">
            <div className="mb-8 lg:mb-0">
              <h2 className="font-montserrat text-3xl md:text-4xl tracking-wide text-white mb-4 whitespace-pre-line">
                {t('footer.title')}
              </h2>
            </div>
          </div>

          {/* Contacts Column */}
          <div className="flex flex-col">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6 pb-2 border-b border-white/20">
              {t('footer.contacts')}
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">{t('footer.phone')}</p>
                <a href="tel:+380671042288" className="text-lg hover:text-orange-500 transition-colors">
                  +38 (067) 104 22 88
                </a>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">{t('footer.address_label')}</p>
                <a
                  href="https://maps.app.goo.gl/iVE1sepfWAnbwx6E8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg leading-relaxed hover:text-orange-500 transition-colors block whitespace-pre-line"
                >
                  {t('footer.address')}
                </a>
              </div>

            </div>
          </div>

          {/* Information Column */}
          <div className="flex flex-col">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6 pb-2 border-b border-white/20">
              {t('footer.info')}
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href={`${langPrefix}/about`} className="text-lg hover:text-orange-500 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/news`} className="text-lg hover:text-orange-500 transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/social-projects`} className="text-lg hover:text-orange-500 transition-colors">
                  {t('nav.social')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/pilgrims`} className="text-lg hover:text-orange-500 transition-colors">
                  {t('nav.pilgrims')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/donate`} className="text-lg hover:text-orange-500 transition-colors">
                  {t('nav.donate')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6 pb-2 border-b border-white/20">
              {t('footer.socials')}
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-orange-500 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-orange-500 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-orange-500 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/380671042288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-orange-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+380671042288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-orange-500 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href="viber://chat?number=%2B380671042288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-orange-500 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Viber</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500">
            {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

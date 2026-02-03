'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';

const ViberIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7.96472 6.2019C7.77897 6.17476 7.58952 6.21205 7.42791 6.30756H7.41413C7.03892 6.52749 6.70092 6.80547 6.41269 7.13115C6.17316 7.40809 6.04322 7.68831 6.0091 7.95803C5.98875 8.11881 6.00253 8.27959 6.05044 8.43315L6.0675 8.44365C6.33722 9.2364 6.68963 9.99896 7.12013 10.7169C7.67467 11.7255 8.35713 12.6583 9.15057 13.4922L9.17419 13.5263L9.2116 13.5539L9.23522 13.5814L9.26278 13.6051C10.0997 14.4008 11.0347 15.0865 12.0453 15.6453C13.2003 16.274 13.9012 16.5713 14.3218 16.6947V16.7012C14.4452 16.7387 14.5574 16.7557 14.6703 16.7557C15.0288 16.7294 15.3682 16.5839 15.6343 16.3423C15.9585 16.054 16.2334 15.7146 16.4481 15.3376V15.331C16.6495 14.9517 16.5813 14.5927 16.2906 14.3499C15.7083 13.841 15.0788 13.389 14.4104 13C13.9628 12.7572 13.5081 12.9042 13.3237 13.1503L12.9306 13.6457C12.7291 13.8918 12.3629 13.8577 12.3629 13.8577L12.3524 13.8643C9.62175 13.1667 8.89332 10.4019 8.89332 10.4019C8.89332 10.4019 8.85919 10.0259 9.11185 9.83425L9.60403 9.43787C9.83963 9.24625 10.0037 8.79212 9.75103 8.3439C9.36477 7.67463 8.91373 7.04489 8.40441 6.46375C8.29306 6.32674 8.13685 6.23353 7.96341 6.20059L7.96472 6.2019Z" fill="currentColor" />
    <path d="M12.5792 5.00009C12.3031 5.00009 12.0792 5.22395 12.0792 5.50009C12.0792 5.77623 12.3031 6.00009 12.5792 6.00009C13.8437 6.00009 14.8944 6.41341 15.7245 7.20484C16.1518 7.63824 16.4844 8.15124 16.7028 8.71263C16.922 9.27613 17.0217 9.877 16.9961 10.4789C16.9844 10.7547 17.1985 10.9879 17.4744 10.9996C17.7503 11.0114 17.9835 10.7972 17.9952 10.5213C18.0267 9.7809 17.9039 9.04214 17.6347 8.35009C17.3655 7.65807 16.9558 7.02746 16.4307 6.49657L16.4207 6.48696C15.3907 5.50193 14.0851 5.00009 12.5792 5.00009Z" fill="currentColor" />
    <path d="M12.5452 6.64442C12.2691 6.64442 12.0452 6.86828 12.0452 7.14442C12.0452 7.42056 12.2691 7.64442 12.5452 7.64442H12.5615C13.474 7.70872 14.1379 8.01286 14.6034 8.5121C15.0799 9.02626 15.3267 9.66489 15.3084 10.4551C15.302 10.7311 15.5207 10.9601 15.7967 10.9665C16.0728 10.9729 16.3018 10.7543 16.3082 10.4782C16.3322 9.44071 15.9985 8.54607 15.3363 7.83174L15.3354 7.8308C14.6588 7.10472 13.7305 6.72061 12.6122 6.64554L12.5955 6.64442H12.5452Z" fill="currentColor" />
    <path d="M12.5263 8.31877C12.2505 8.30426 12.0152 8.51604 12.0007 8.7918C11.9862 9.06756 12.198 9.30287 12.4737 9.31739C12.8924 9.33943 13.1592 9.46499 13.327 9.63443C13.4956 9.8046 13.6216 10.0771 13.6446 10.5043C13.6595 10.7801 13.895 10.9916 14.1708 10.9767C14.4465 10.9619 14.658 10.7264 14.6432 10.4506C14.6109 9.85058 14.4231 9.32011 14.0376 8.93078C13.6513 8.54072 13.1238 8.35022 12.5263 8.31877Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.06673 2.38357C10.2488 1.67227 13.5487 1.67227 16.7308 2.38357L17.0699 2.45935C18.9667 2.88334 20.4637 4.33816 20.9418 6.22204C21.7495 9.40488 21.7495 12.7391 20.9418 15.9219C20.4637 17.8058 18.9666 19.2606 17.0699 19.6846L16.7308 19.7604C14.732 20.2072 12.6867 20.3733 10.6533 20.2588L8.0001 22.6327C7.79637 22.815 7.50959 22.872 7.25164 22.7815C6.99369 22.691 6.80543 22.4673 6.76029 22.1976L6.32148 19.5763C4.61909 19.0473 3.29919 17.6691 2.85579 15.9219C2.04807 12.7391 2.04807 9.40488 2.85579 6.22204C3.33386 4.33816 4.83092 2.88334 6.7277 2.45935L7.06673 2.38357ZM16.4036 3.84744C13.437 3.18432 10.3606 3.18432 7.39395 3.84744L7.05492 3.92323C5.71009 4.22383 4.64866 5.25532 4.3097 6.591C3.56343 9.53171 3.56343 12.6122 4.3097 15.5529C4.64866 16.8886 5.71008 17.9201 7.05492 18.2207L7.14448 18.2407C7.44237 18.3073 7.67018 18.5478 7.72058 18.8488L8.01485 20.6068L9.88722 18.9315C10.0384 18.7962 10.2379 18.7279 10.4403 18.7423C12.4338 18.8834 14.4427 18.7348 16.4036 18.2965L16.7426 18.2207C18.0875 17.9201 19.1489 16.8886 19.4879 15.5529C20.2341 12.6122 20.2341 9.53171 19.4879 6.591C19.1489 5.25532 18.0875 4.22384 16.7426 3.92323L16.4036 3.84744Z" fill="currentColor" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.5 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

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
                <a href="tel:+380671042288" className="text-lg hover:text-amber-600 transition-colors">
                  +38 (067) 104 22 88
                </a>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">{t('footer.address_label')}</p>
                <a
                  href="https://maps.app.goo.gl/iVE1sepfWAnbwx6E8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg leading-relaxed hover:text-amber-600 transition-colors block whitespace-pre-line"
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
                <Link href={`${langPrefix}/about`} className="text-lg hover:text-amber-600 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/news`} className="text-lg hover:text-amber-600 transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/social-projects`} className="text-lg hover:text-amber-600 transition-colors">
                  {t('nav.social')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/pilgrims`} className="text-lg hover:text-amber-600 transition-colors">
                  {t('nav.pilgrims')}
                </Link>
              </li>
              <li>
                <Link href={`${langPrefix}/donate`} className="text-lg hover:text-amber-600 transition-colors">
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
                  href="https://www.facebook.com/chernectvo.volyni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-amber-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/chernetstvovolyni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-amber-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@chernectvo_volyni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-amber-600 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com/channel/0029VbCZlG3GpLHWYKNea425"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-amber-600 transition-colors"
                >
                  <WhatsappIcon className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/chernetstvo_volyni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-amber-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://invite.viber.com/?g2=AQAB6djHxEo4k1YHgvbWNapcX0pRA%2B2o8tUn5LLB5Jv%2BX1BCZhctg2bkqIY%2BTmoM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-lg hover:text-amber-600 transition-colors"
                >
                  <ViberIcon className="w-6 h-6 transition-all duration-300" />
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

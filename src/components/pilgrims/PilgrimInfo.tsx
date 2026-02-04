'use client';

import React, { useState, useEffect } from 'react';
import { Info, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { TextModal } from '../ui/TextModal';

const pilgrimSections = [
  {
    key: 'rules',
    items: ['appearance', 'photo', 'privacy', 'silence', 'responsibility', 'pets']
  },
  {
    key: 'schedule',
    items: ['calendar_hint'],
    hasGroups: true
  },
  {
    key: 'excursions',
    items: ['types', 'versatility', 'no_borders', 'booking']
  },
  {
    key: 'transport',
    items: ['public', 'car', 'bike', 'taxi', 'bus_tip']
  },
  {
    key: 'lodging',
    items: ['food', 'sleep', 'future']
  },
  {
    key: 'help',
    items: ['prayer', 'volunteer', 'finance', 'social'],
    footerKey: 'footer'
  }
];

export function PilgrimInfo() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const selectedSection = pilgrimSections.find(s => s.key === selectedKey);

  const renderIntroText = () => {
    if (!selectedKey) return null;
    const text = t(`pilgrims.${selectedKey}.short`);

    if (selectedKey === 'schedule') {
      const targetUA = 'інтерактивним розкладом богослужінь';
      const targetEN = 'interactive service schedule';
      const target = language === 'UA' ? targetUA : targetEN;

      if (text.includes(target)) {
        const parts = text.split(target);
        const homePath = `/${language.toLowerCase()}`;

        return (
          <>
            {parts[0]}
            <a
              href={`${homePath}#calendar`}
              onClick={() => setSelectedKey(null)}
              className="text-amber-600 underline hover:text-amber-700 font-bold decoration-amber-600/30 underline-offset-4 transition-all"
            >
              {target}
            </a>
            {parts[1]}
          </>
        );
      }
    }
    return text;
  };

  const renderTextWithLinks = (text: string) => {
    const website = 'zhydychyn.center';
    if (text.includes(website)) {
      const parts = text.split(website);
      return (
        <>
          {parts[0]}
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 font-bold hover:underline decoration-amber-600/30 underline-offset-4"
          >
            {website}
          </a>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px]">

        {/* Title */}
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl uppercase tracking-widest text-left mb-12 text-gray-900 border-l-4 border-amber-600 pl-6">
          {t('pilgrims.title')}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pilgrimSections.map((section) => (
            <div
              key={section.key}
              onClick={() => setSelectedKey(section.key)}
              className="group bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-amber-600 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 h-full min-h-[160px]"
            >
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold font-montserrat text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {t(`pilgrims.${section.key}.title`)}
                </h3>
                <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed line-clamp-2">
                  {t(`pilgrims.${section.key}.short`)}
                </p>
              </div>

              {/* Arrow Circle */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:rotate-45 transition-all duration-300">
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Localized TextModal */}
      <TextModal
        isOpen={!!selectedKey}
        onClose={() => setSelectedKey(null)}
        title={selectedKey ? t(`pilgrims.${selectedKey}.title`) : ''}
      >
        {selectedSection && (
          <div className="space-y-12 py-8">
            {/* Intro Description */}
            <div className="mb-12">
              <p className="text-gray-700 leading-relaxed font-sans text-lg md:text-xl whitespace-pre-line border-l-4 border-amber-500 pl-6 italic">
                {renderIntroText()}
              </p>
            </div>

            {/* Dynamic Items Blocks */}
            <div className="space-y-12">
              {selectedSection.items.map((itemKey) => {
                const fullText = t(`pilgrims.${selectedKey}.${itemKey}`);
                const parts = fullText.split(': ');
                const hasTitle = parts.length > 1;

                const isHighlighted =
                  (selectedKey === 'excursions' && itemKey === 'booking') ||
                  (selectedKey === 'transport' && itemKey === 'bus_tip') ||
                  (selectedKey === 'lodging' && itemKey === 'future');

                return (
                  <div key={itemKey} className="group/item text-left">
                    {isHighlighted ? (
                      <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 space-y-6">
                        {hasTitle && (
                          <h3 className="font-montserrat font-bold text-2xl text-amber-900 border-b border-amber-200 pb-4">
                            {parts[0]}
                          </h3>
                        )}
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-white hidden md:flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                            <ChevronRight className="w-6 h-6" />
                          </div>
                          <p className="text-amber-800 text-lg leading-relaxed">
                            {renderTextWithLinks(hasTitle ? parts.slice(1).join(': ') : fullText)}
                          </p>
                        </div>
                      </div>
                    ) : hasTitle ? (
                      <div className="space-y-3">
                        <h4 className="font-montserrat font-bold text-xl text-gray-900 flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-amber-600 group-hover/item:scale-150 transition-transform" />
                          {parts[0]}
                        </h4>
                        <p className="text-gray-600 text-lg leading-relaxed pl-5">
                          {renderTextWithLinks(parts.slice(1).join(': '))}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-4 items-start bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <Info className="w-6 h-6 text-amber-500 shrink-0" />
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {renderTextWithLinks(fullText)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Special section for Schedule groups */}
              {selectedSection.hasGroups && (
                <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 space-y-6 text-left">
                  <h3 className="font-montserrat font-bold text-2xl text-amber-900 border-b border-amber-200 pb-4">
                    {t('pilgrims.schedule.groups_title')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white hidden md:flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                      <p className="text-amber-800 text-lg">{t('pilgrims.schedule.pastor')}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white hidden md:flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                      <p className="text-amber-800 text-lg">{t('pilgrims.schedule.program')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer / Final remark */}
              {selectedSection.footerKey && (
                <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 text-left">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white hidden md:flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                    <p className="text-amber-800 text-lg leading-relaxed">
                      {t(`pilgrims.${selectedKey}.${selectedSection.footerKey}`)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </TextModal>
    </section>
  );
}

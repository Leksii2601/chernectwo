'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactsPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white">
            <PageHeader title={t('contacts.title')} backgroundImage="/media/contacts.jpg" />
            <div className="max-w-[1200px] mx-auto px-4 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info */}
                    <div className="space-y-16 py-4">
                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 flex shrink-0 items-center justify-center bg-amber-50 rounded-full text-amber-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{t('contacts.address_label')}</h3>
                                <p className="text-xl text-gray-800 leading-relaxed max-w-sm whitespace-pre-line">
                                    {t('contacts.address_val')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 flex shrink-0 items-center justify-center bg-amber-50 rounded-full text-amber-600">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{t('contacts.phone_label')}</h3>
                                <a href="tel:+380671042288" className="text-xl text-gray-800 hover:text-amber-600 transition-colors block">
                                    +38 (067) 104 22 88
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 flex shrink-0 items-center justify-center bg-amber-50 rounded-full text-amber-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{t('contacts.email_label')}</h3>
                                <a href="mailto:chernectwo@gmail.com" className="text-xl text-gray-800 hover:text-amber-600 transition-colors block">
                                    chernectwo@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-[550px] bg-gray-100 rounded-lg overflow-hidden shadow-xl border border-gray-100">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.430767626645!2d25.3020407765785!3d50.80936887166296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472597c7c782c3dd%3A0x38994f41752c77fb!2z0JbQuNC00LjRh9C40L3RgdGM0LrQuNC5INCh0LLRj9GC0L4t0JzQuNC60L7Qu9Cw0ZfQstGB0YzQutC40Lkg0LzQvtC90LDRgdGC0LjRgCAo0J_QptCjKQ!5e1!3m2!1suk!2sua!4v1768489923329!5m2!1suk!2sua"
                            className="w-full h-full border-0"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
            <Footer />
            <FloatingButton />
        </main>
    );
}

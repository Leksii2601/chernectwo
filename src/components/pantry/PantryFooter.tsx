'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Send, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function PantryFooter() {
    const { t, language } = useLanguage();
    const lang = language.toLowerCase();

    return (
        <footer className="bg-white border-t border-[#e8e4db] pt-20 pb-10 px-4 md:px-8">
            <div className="max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    
                    {/* Brand & Mission */}
                    <div className="space-y-6">
                        <Link href={`/${lang}/pantry`} className="inline-block">
                            <span className="font-church text-3xl tracking-tight text-[#4a3f35]">КОМОРА</span>
                            <div className="h-px w-full bg-[#b49e82] mt-1" />
                        </Link>
                        <p className="text-[#8c7e6a] text-sm leading-relaxed max-w-xs font-sans">
                            {language === 'UA' 
                                ? 'Місія нашої Комори — підтримувати монастирську громаду та ділитися плодами нашої праці через натуральні продукти та духовні книги.' 
                                : 'Our Pantry\'s mission is to support the monastery community and share the fruits of our labor through natural products and spiritual books.'}
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49e82]">
                            {language === 'UA' ? 'Магазин' : 'Shop'}
                        </h4>
                        <ul className="space-y-4">
                            <li><Link href={`/${lang}/pantry`} className="text-sm text-[#4a3f35] hover:text-[#b49e82] transition-colors">{t('pantry.all_products')}</Link></li>
                            <li><Link href={`/${lang}/pantry?category=books`} className="text-sm text-[#4a3f35] hover:text-[#b49e82] transition-colors">{t('pantry.category.books')}</Link></li>
                            <li><Link href={`/${lang}/pantry?category=honey`} className="text-sm text-[#4a3f35] hover:text-[#b49e82] transition-colors">{t('pantry.category.honey')}</Link></li>
                            <li><Link href={`/${lang}/pantry/cart`} className="text-sm text-[#4a3f35] hover:text-[#b49e82] transition-colors">{language === 'UA' ? 'Кошик' : 'Cart'}</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49e82]">
                            {t('pantry.footer.support')}
                        </h4>
                        <ul className="space-y-4">
                            <li><Link href={`/${lang}/pantry/delivery`} className="text-sm text-[#4a3f35] hover:text-[#b49e82] transition-colors">{t('pantry.footer.delivery')}</Link></li>
                            <li><Link href={`/${lang}/pantry/returns`} className="text-sm text-[#4a3f35] hover:text-[#b49e82] transition-colors">{t('pantry.footer.returns')}</Link></li>
                            <li><Link href={`/${lang}/pantry/terms`} className="text-sm text-[#4a3f35] hover:text-[#b49e82] transition-colors">{t('pantry.footer.terms')}</Link></li>
                            <li><Link href={`/${lang}`} className="text-sm text-[#b49e82] font-bold hover:text-black transition-colors">{t('pantry.footer.monastery_site')}</Link></li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49e82]">
                            {language === 'UA' ? 'Контакти' : 'Contacts'}
                        </h4>
                        <div className="space-y-4 text-sm text-[#4a3f35]">
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-[#b49e82]" />
                                <a href="tel:+380671042288" className="hover:text-[#b49e82] transition-colors">+38 (067) 104 22 88</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-[#b49e82]" />
                                <a href="mailto:pantry@monastery.ua" className="hover:text-[#b49e82] transition-colors">pantry@monastery.ua</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-10 border-t border-[#f3f1ed] flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-[#b49e82] uppercase tracking-[0.1em] font-bold text-center md:text-left">
                    <div className="space-y-4 md:space-y-2">
                        <p>&copy; {new Date().getFullYear()} Жидичинська Обитель. Комора</p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <a href="https://facebook.com" target="_blank" className="text-[#8c7e6a] hover:text-black transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="https://instagram.com" target="_blank" className="text-[#8c7e6a] hover:text-black transition-colors">
                                <Instagram size={16} />
                            </a>
                            <a href="https://t.me" target="_blank" className="text-[#8c7e6a] hover:text-black transition-colors">
                                <Send size={16} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 opacity-60">
                        <div className="flex gap-4">
                            <span>VISA</span>
                            <span>MASTERCARD</span>
                        </div>
                        <div className="h-px w-8 bg-[#e8e4db] hidden md:block" />
                        <span>NOVA POSHTA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

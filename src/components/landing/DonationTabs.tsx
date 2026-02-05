'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Copy, Check, CreditCard, Building2, Globe, ChevronDown, Lock, Heart, Layers } from 'lucide-react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        Wayforpay: any;
    }
}

interface DonationTabsProps {
    className?: string;
}

type TabType = 'card' | 'ua' | 'abroad' | 'crypto';
type FrequencyType = 'once' | 'subscription';

export const DonationTabs: React.FC<DonationTabsProps> = ({ className }) => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabType>('card');
    const [frequency, setFrequency] = useState<FrequencyType>('once');
    const [amount, setAmount] = useState<number>(100);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState<boolean | null>(null);
    const [currency, setCurrency] = useState<'UAH' | 'USD' | 'EUR'>('UAH');
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
    const [showPaymentFields, setShowPaymentFields] = useState(false);
    const currencyDropdownRef = useRef<HTMLDivElement>(null);

    const [copiedText, setCopiedText] = useState<string | null>(null);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2000);
    };

    const handleAmountClick = (val: number) => {
        setAmount(val);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value);
        setAmount(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const finalAmount = customAmount ? parseFloat(customAmount) : amount;
        const finalCurrency = currency;

        if (finalAmount <= 0) {
            alert(t('donate.specify_amount'));
            return;
        }

        if (agreed === null || agreed === false) {
            alert(t('donate.agree_terms'));
            return;
        }

        if (typeof window !== 'undefined' && window.Wayforpay) {
            try {
                // Generate order details
                const orderReference = 'Order_' + Date.now();
                const orderDate = Math.floor(Date.now() / 1000);

                // 1. Get signature from our API
                const response = await fetch('/api/wayforpay/signature', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: finalAmount,
                        currency: finalCurrency,
                        orderReference,
                        orderDate
                    })
                });

                const data = await response.json();

                if (data.error) throw new Error(data.error);

                setShowPaymentFields(true);

                // Wait for DOM to update with iframe
                setTimeout(() => {
                    const form = document.getElementById('wayforpay-form') as HTMLFormElement;
                    if (form) {
                        // Populate hidden fields
                        (form.querySelector('input[name="merchantAccount"]') as HTMLInputElement).value = data.merchantAccount;
                        (form.querySelector('input[name="merchantDomainName"]') as HTMLInputElement).value = data.merchantDomainName;
                        (form.querySelector('input[name="merchantSignature"]') as HTMLInputElement).value = data.merchantSignature;
                        (form.querySelector('input[name="orderReference"]') as HTMLInputElement).value = data.orderReference;
                        (form.querySelector('input[name="orderDate"]') as HTMLInputElement).value = data.orderDate;
                        (form.querySelector('input[name="amount"]') as HTMLInputElement).value = data.amount;
                        (form.querySelector('input[name="currency"]') as HTMLInputElement).value = data.currency;
                        (form.querySelector('input[name="productName[]"]') as HTMLInputElement).value = data.productName;
                        (form.querySelector('input[name="productPrice[]"]') as HTMLInputElement).value = data.productPrice;
                        (form.querySelector('input[name="productCount[]"]') as HTMLInputElement).value = data.productCount;
                        (form.querySelector('input[name="clientEmail"]') as HTMLInputElement).value = email;
                        (form.querySelector('input[name="language"]') as HTMLInputElement).value = language === 'UA' ? 'UA' : 'EN';

                        form.submit();

                        // Smooth scroll to payment area
                        document.getElementById('wayforpay-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);

            } catch (err) {
                console.error("WayForPay transaction failed:", err);
                window.open('https://secure.wayforpay.com/button/b8fa93469fc94', '_blank', 'noopener,noreferrer');
            }
        } else {
            window.open('https://secure.wayforpay.com/button/b8fa93469fc94', '_blank', 'noopener,noreferrer');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
                setIsCurrencyDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const amounts = [100, 200, 500, 1000];

    // Define subscription amounts per currency
    const subscriptionAmountsBase = {
        UAH: [125, 250, 375, 750, 1250, 2500],
        USD: [10, 15, 25, 50, 100, 150], // Adjusted typical USD amounts
        EUR: [10, 15, 25, 50, 100, 150], // Adjusted typical EUR amounts
    };

    const currencies = [
        { code: 'UAH', symbol: '₴', label: 'UAH, ₴' },
        { code: 'USD', symbol: '$', label: 'USD, $' },
        { code: 'EUR', symbol: '€', label: 'EUR, €' }
    ] as const;

    const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];
    const currentSubscriptionAmounts = subscriptionAmountsBase[currency as keyof typeof subscriptionAmountsBase] || subscriptionAmountsBase.UAH;


    return (
        <div className={`bg-white rounded-xl shadow-xl border border-gray-100 max-w-4xl mx-auto ${className}`}>
            <style jsx>{`
                /* Hide spin buttons for number input */
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>

            <div className="p-6 md:p-8">
                {/* Tabs Header */}
                <div className="mb-8">
                    <h3 className="font-montserrat text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide border-l-4 border-amber-600 pl-3">
                        {t('donate.payment_method')}
                    </h3>
                    <div className="grid grid-cols-2 md:flex bg-gray-100 p-1 rounded-xl border border-gray-200 w-full gap-1 md:gap-0">
                        <button
                            onClick={() => setActiveTab('card')}
                            className={`flex items-center justify-center gap-2 col-span-2 md:flex-1 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'card'
                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <CreditCard className="w-4 h-4 hidden md:block" />
                            {t('donate.card')}
                        </button>
                        <button
                            onClick={() => setActiveTab('ua')}
                            className={`flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'ua'
                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <Building2 className="w-4 h-4 hidden md:block" />
                            <span>{t('donate.transfer_ua')}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('abroad')}
                            className={`flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${activeTab === 'abroad'
                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <Globe className="w-4 h-4 hidden md:block" />
                            <span>{t('donate.transfer_abroad')}</span>
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">

                    {/* CARD TAB */}
                    {activeTab === 'card' && (
                        <>
                            <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-2 duration-300">

                                {/* Frequency */}
                                <div className="mb-8">
                                    <h3 className="font-montserrat text-sm font-bold mb-3 text-gray-700 uppercase tracking-wide">
                                        {t('donate.frequency')}
                                    </h3>
                                    <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl border border-gray-200 w-full md:w-auto md:min-w-[320px] relative isolate">
                                        <div className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm ring-1 ring-gray-200 transition-transform duration-300 ease-in-out z-0 ${frequency === 'subscription' ? 'translate-x-full left-1' : 'translate-x-0 left-1'}`} />
                                        <button
                                            type="button"
                                            onClick={() => setFrequency('once')}
                                            className={`px-6 py-3 rounded-lg text-sm font-bold transition-all uppercase tracking-wide relative z-10 flex items-center justify-center ${frequency === 'once' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                                                }`}
                                        >
                                            {t('donate.once')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFrequency('subscription')}
                                            className={`px-6 py-3 rounded-lg text-sm font-bold transition-all uppercase tracking-wide relative z-10 flex items-center justify-center gap-2 ${frequency === 'subscription' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                                                }`}
                                        >
                                            {t('donate.subscription')}
                                        </button>
                                    </div>
                                </div>

                                {/* Amount and Currency */}
                                <div className="mb-8">
                                    <h3 className="font-montserrat text-sm font-bold mb-3 text-gray-700 uppercase tracking-wide">
                                        {frequency === 'subscription' ? t('donate.amount_subscription_label') || t('donate.amount') : t('donate.amount')}
                                    </h3>

                                    {/* Currency Selector - Different style based on frequency */}
                                    <div className="mb-6 flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                                        {frequency === 'subscription' ? (
                                            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 w-full">
                                                {currencies.map((c) => (
                                                    <button
                                                        key={c.code}
                                                        type="button"
                                                        onClick={() => setCurrency(c.code as any)}
                                                        className={`flex-1 py-3 font-bold text-center rounded-lg transition-all uppercase ${currency === c.code
                                                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                                                            : 'text-gray-500 hover:text-gray-900'
                                                            }`}
                                                    >
                                                        {c.label}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>

                                    {frequency === 'subscription' ? (
                                        <div className="grid grid-cols-2 lg:grid-cols-6 rounded-xl border border-gray-200 divide-x md:divide-x divide-gray-200 overflow-visible shadow-sm relative z-0 w-full mb-8">
                                            {currentSubscriptionAmounts.map((val, index) => {
                                                const isSelected = amount === val;

                                                return (
                                                    <button
                                                        key={val}
                                                        type="button"
                                                        onClick={() => handleAmountClick(val)}
                                                        className={`relative w-full py-8 px-2 transition-all flex flex-col items-center justify-center text-center group border-b md:border-b-0 border-gray-100 last:border-b-0
                                                        ${index === 0 ? 'rounded-tl-xl md:rounded-l-xl' : ''} 
                                                        ${index === 1 ? 'rounded-tr-xl md:rounded-tr-none' : ''} 
                                                        ${index === currentSubscriptionAmounts.length - 2 ? 'rounded-bl-xl md:rounded-bl-none' : ''}
                                                        ${index === currentSubscriptionAmounts.length - 1 ? 'rounded-br-xl md:rounded-r-xl' : ''}
                                                        ${isSelected
                                                                ? 'z-20 bg-amber-600 text-white shadow-[0_15px_35px_rgba(217,119,6,0.25)] transform scale-[1.05] border-transparent'
                                                                : 'bg-white z-0 text-gray-400 hover:bg-amber-600 hover:text-white hover:z-10'
                                                            }
                                                     `}
                                                    >
                                                        <div className={`w-10 h-10 mb-3 flex items-center justify-center border-2 rounded-lg transition-colors ${isSelected ? 'border-white/40 text-white' : 'border-gray-200 text-gray-300 group-hover:border-white/30 group-hover:text-white'}`}>
                                                            {isSelected ? (
                                                                <Layers className="w-5 h-5" />
                                                            ) : (
                                                                <Heart className="w-5 h-5" />
                                                            )}
                                                        </div>
                                                        <span className={`text-lg font-black mb-1 uppercase tracking-tight transition-colors ${isSelected ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>{val} {currentCurrency.code}</span>
                                                        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isSelected ? 'text-white/70' : 'text-gray-400 group-hover:text-white/60'}`}>{t('donate.per_week')}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="relative flex items-center border-2 border-gray-200 rounded-xl bg-white focus-within:border-amber-600 transition-colors h-16 md:h-20 pr-0 overflow-visible group shadow-sm">
                                                {/* Currency Prefix */}
                                                <div className="pl-6 pr-2 text-3xl md:text-4xl text-gray-800 font-bold select-none h-full flex items-center">
                                                    {currentCurrency.symbol}
                                                </div>

                                                <input
                                                    type="number"
                                                    placeholder={amount > 0 ? '' : t('donate.other_amount')}
                                                    value={customAmount || (amount > 0 ? amount : '')}
                                                    onChange={handleCustomAmountChange}
                                                    className="w-full text-3xl md:text-4xl font-bold py-4 outline-none bg-transparent placeholder:text-gray-300 text-gray-800 h-full font-montserrat"
                                                />

                                                {/* Included Dropdown for One-time - Full height, bigger font */}
                                                <div className="relative h-full flex items-center" ref={currencyDropdownRef}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                                                        className="h-full px-6 bg-white hover:bg-gray-50 border-l border-gray-100 transition-all flex items-center gap-2 text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap rounded-r-xl"
                                                    >
                                                        {currentCurrency.code}
                                                        <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    {isCurrencyDropdownOpen && (
                                                        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                                            {currencies.map((c) => (
                                                                <button
                                                                    key={c.code}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setCurrency(c.code as any);
                                                                        setIsCurrencyDropdownOpen(false);
                                                                    }}
                                                                    className={`w-full text-left px-5 py-4 text-lg font-bold hover:bg-amber-600 hover:text-white transition-colors flex items-center justify-between ${currency === c.code ? 'text-white bg-amber-600' : 'text-gray-700'
                                                                        }`}
                                                                >
                                                                    <span>{c.code} <span className={`ml-1 ${currency === c.code ? 'text-white/60' : 'text-gray-400'}`}>{c.symbol}</span></span>
                                                                    {currency === c.code && <Check className="w-5 h-5" />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>


                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {amounts.map((val) => {
                                                    const isSelected = amount === val && !customAmount;
                                                    return (
                                                        <button
                                                            key={val}
                                                            type="button"
                                                            onClick={() => handleAmountClick(val)}
                                                            className={`py-6 px-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center min-h-[110px] shadow-sm transform active:scale-95 ${isSelected
                                                                ? 'border-amber-600 bg-amber-600 text-white shadow-lg scale-[1.05] z-10'
                                                                : 'border-gray-200 hover:border-amber-600 hover:bg-amber-600 hover:text-white text-gray-900 bg-white z-0'
                                                                }`}
                                                        >
                                                            <span className="text-xl md:text-2xl font-black">+{val} {currentCurrency.code}</span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="mb-6">
                                    <h3 className="font-montserrat text-xs font-bold mb-3 text-gray-500 uppercase tracking-widest">
                                        Email*
                                    </h3>
                                    <input
                                        type="email"
                                        required
                                        className="w-full p-4 border border-gray-200 bg-white rounded-xl focus:border-amber-600 outline-none transition-all font-medium text-base h-14"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Agreement */}
                                <div className="mb-8 p-0">
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed font-bold">
                                        {language === 'UA'
                                            ? 'Чи бажаєте ви отримувати email-листи від монастиря: новини, звітність та духовні настанови?*'
                                            : 'Would you like to receive email letters from the monastery: news, reports and spiritual guidance?*'}
                                    </p>
                                    <div className="flex flex-wrap gap-8">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${agreed === true ? 'border-amber-600 bg-amber-600' : 'border-gray-300'}`}>
                                                {agreed === true && <div className="w-2 rounded-full bg-white shadow-sm h-2" />}
                                            </div>
                                            <input type="radio" name="gdpr" className="hidden" onChange={() => setAgreed(true)} checked={agreed === true} />
                                            <span className={`text-sm font-bold ${agreed === true ? 'text-gray-900' : 'text-gray-500'}`}>{t('donate.agree')}</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${agreed === false ? 'border-amber-600 bg-amber-600' : 'border-gray-300'}`}>
                                                {agreed === false && <div className="w-2 rounded-full bg-white shadow-sm h-2" />}
                                            </div>
                                            <input type="radio" name="gdpr" className="hidden" onChange={() => setAgreed(false)} checked={agreed === false} />
                                            <span className={`text-sm font-bold ${agreed === false ? 'text-gray-900' : 'text-gray-500'}`}>{t('donate.disagree')}</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full py-5 bg-amber-600 text-white font-montserrat font-bold text-lg uppercase tracking-[0.2em] hover:bg-amber-700 transition-all rounded-xl shadow-[0_15px_45px_rgba(217,119,6,0.25)] hover:shadow-[0_20px_50px_rgba(217,119,6,0.4)] active:scale-95 duration-300"
                                >
                                    {t('donate.support_button')}
                                </button>
                                {/* Secure Payment Note */}
                                <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                                    <Lock className="w-3 h-3 mb-0.5" />
                                    <span>{t('donate.safe_transaction')}</span>
                                </div>
                            </form>

                            {/* Hidden WayForPay Form - Outside main form to avoid nested forms error */}
                            <form id="wayforpay-form" action="https://secure.wayforpay.com/pay" method="post" target="wayforpay-iframe" className="hidden">
                                <input name="merchantAccount" value="" readOnly />
                                <input name="merchantDomainName" value="" readOnly />
                                <input name="merchantSignature" value="" readOnly />
                                <input name="orderReference" value="" readOnly />
                                <input name="orderDate" value="" readOnly />
                                <input name="amount" value="" readOnly />
                                <input name="currency" value="" readOnly />
                                <input name="productName[]" value="" readOnly />
                                <input name="productPrice[]" value="" readOnly />
                                <input name="productCount[]" value="" readOnly />
                                <input name="clientEmail" value="" readOnly />
                                <input name="language" value={language === 'UA' ? 'UA' : 'EN'} readOnly />
                            </form>

                            {/* Payment Methods Visuals - Appears only after clicking Support */}
                            {showPaymentFields && (
                                <div id="wayforpay-container" className="my-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="relative w-full min-h-[600px] bg-white rounded-2xl border border-gray-100 shadow-inner overflow-hidden">
                                        <iframe
                                            name="wayforpay-iframe"
                                            id="wayforpay-iframe"
                                            className="absolute inset-0 w-full h-full border-none"
                                            title="Payment Form"
                                        ></iframe>
                                    </div>
                                    <p className="mt-4 text-center text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                                        {language === 'UA' ? 'Оплата через захищений шлюз WayForPay' : 'Payment via secure WayForPay gateway'}
                                    </p>
                                </div>
                            )}
                        </>
                    )}


                    {/* UA TRANSFER TAB */}
                    {
                        activeTab === 'ua' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 px-1 font-sans">
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                    <img src="https://savelife.in.ua/wp-content/uploads/2022/08/pryvat.svg" alt="PrivatBank" className="h-8" />
                                    <span className="font-bold text-gray-700 text-lg uppercase">{t('donate.privatbank_header')}</span>
                                </div>

                                <div className="space-y-4">
                                    <RequisiteItem
                                        label={t('donate.recipient')}
                                        value="РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР"
                                        onCopy={() => copyToClipboard('РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР', 'Recipient')}
                                        copied={copiedText === 'Recipient'}
                                        copyLabel={t('donate.copy_label')}
                                    />
                                    <RequisiteItem
                                        label={t('donate.edrpou')}
                                        value="26278106"
                                        onCopy={() => copyToClipboard('26278106', 'EDRPOU')}
                                        copied={copiedText === 'EDRPOU'}
                                        copyLabel={t('donate.copy_label')}
                                    />
                                    <RequisiteItem
                                        label={t('donate.iban')}
                                        value="UA7730529900000026006000812444"
                                        onCopy={() => copyToClipboard('UA7730529900000026006000812444', 'IBAN')}
                                        copied={copiedText === 'IBAN'}
                                        copyLabel={t('donate.copy_label')}
                                    />
                                    <RequisiteItem
                                        label={t('donate.bank')}
                                        value={t('donate.bank_address_val')}
                                        onCopy={() => copyToClipboard(t('donate.bank_address_val'), 'Bank')}
                                        copied={copiedText === 'Bank'}
                                        copyLabel={t('donate.copy_label')}
                                    />
                                    <RequisiteItem
                                        label={t('donate.payment_purpose')}
                                        value={t('donate.payment_purpose_val')}
                                        onCopy={() => copyToClipboard(t('donate.payment_purpose_val'), 'Purpose')}
                                        copied={copiedText === 'Purpose'}
                                        copyLabel={t('donate.copy_label')}
                                    />
                                </div>
                            </div>
                        )
                    }


                    {/* ABROAD TAB */}
                    {
                        activeTab === 'abroad' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 font-sans">

                                <div className="mb-6">
                                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                        <img src="https://savelife.in.ua/wp-content/uploads/2022/08/pryvat.svg" alt="PrivatBank" className="h-8" />
                                        <span className="font-bold text-gray-700 text-lg uppercase">{t('donate.privatbank_header')}</span>
                                    </div>

                                    <div className="space-y-4">
                                        <RequisiteItem
                                            label={t('donate.bank_name_label_bilingual')}
                                            value={t('donate.bank_name_val_only')}
                                            onCopy={() => copyToClipboard(t('donate.bank_name_val_only'), 'Bank Name')}
                                            copied={copiedText === 'Bank Name'}
                                            copyLabel={t('donate.copy_label')}
                                        />

                                        <RequisiteItem
                                            label={t('donate.bank_address_label_bilingual')}
                                            value={t('donate.bank_address_val_only')}
                                            onCopy={() => copyToClipboard(t('donate.bank_address_val_only'), 'Bank Address')}
                                            copied={copiedText === 'Bank Address'}
                                            copyLabel={t('donate.copy_label')}
                                        />

                                        <RequisiteItem
                                            label={t('donate.company_name_label')}
                                            value={t('donate.company_name_val_exact')}
                                            onCopy={() => copyToClipboard(t('donate.company_name_val_exact'), 'Company Name')}
                                            copied={copiedText === 'Company Name'}
                                            copyLabel={t('donate.copy_label')}
                                        />

                                        <RequisiteItem
                                            label={t('donate.company_address_label')}
                                            value={t('donate.company_address_val_exact')}
                                            onCopy={() => copyToClipboard(t('donate.company_address_val_exact'), 'Company Address')}
                                            copied={copiedText === 'Company Address'}
                                            copyLabel={t('donate.copy_label')}
                                        />

                                        <RequisiteItem
                                            icon={<div className="w-8 h-8 rounded-full border border-gray-200 bg-white items-center justify-center font-bold text-xs text-gray-900 shadow-sm hidden md:flex">€</div>}
                                            label={t('donate.iban_eur')}
                                            value="UA093052990000026004025029786"
                                            onCopy={() => copyToClipboard('UA093052990000026004025029786', 'IBAN EUR')}
                                            copied={copiedText === 'IBAN EUR'}
                                            copyLabel={t('donate.copy_label')}
                                        />
                                        <RequisiteItem
                                            icon={<div className="w-8 h-8 rounded-full border border-gray-200 bg-white items-center justify-center font-bold text-xs text-gray-900 shadow-sm hidden md:flex">$</div>}
                                            label={t('donate.iban_usd')}
                                            value="UA173052990000026009035028620"
                                            onCopy={() => copyToClipboard('UA173052990000026009035028620', 'IBAN USD')}
                                            copied={copiedText === 'IBAN USD'}
                                            copyLabel={t('donate.copy_label')}
                                        />

                                        <RequisiteItem
                                            label={t('donate.swift_label_bilingual')}
                                            value="PBANUA2X"
                                            onCopy={() => copyToClipboard('PBANUA2X', 'SWIFT')}
                                            copied={copiedText === 'SWIFT'}
                                            copyLabel={t('donate.copy_label')}
                                        />

                                        <RequisiteItem
                                            label={t('donate.payment_purpose_label_bilingual')}
                                            value={t('donate.payment_purpose_val_bilingual')}
                                            onCopy={() => copyToClipboard(t('donate.payment_purpose_val_bilingual'), 'Purpose')}
                                            copied={copiedText === 'Purpose'}
                                            copyLabel={t('donate.copy_label')}
                                            isPurpose
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div >
            </div >
        </div >
    );
};

const RequisiteItem: React.FC<{
    label: string;
    value: string;
    onCopy: () => void;
    copied: boolean;
    highlight?: boolean;
    copyLabel?: string;
    noBorder?: boolean;
    icon?: React.ReactNode;
    isPurpose?: boolean;
}> = ({ label, value, onCopy, copied, highlight, copyLabel, noBorder, icon, isPurpose }) => (
    <div
        className={`flex ${noBorder ? 'items-start -mx-4 px-4 py-3' : 'flex-col md:flex-row md:items-center p-4 rounded-xl border'} justify-between gap-4 transition-all group cursor-pointer ${!noBorder ? (highlight ? 'bg-amber-50 border-amber-600' : 'bg-white border-gray-100 hover:border-gray-300') : 'hover:bg-gray-50'
            }`}
        onClick={onCopy}
    >
        <div className={`flex flex-col md:flex-row ${noBorder ? 'items-start gap-3' : 'gap-2'} flex-1 min-w-0`}>
            {icon && <div className="mt-0.5">{icon}</div>}
            <div className="flex-1">
                <p className={`text-xs md:text-sm text-gray-500 uppercase tracking-widest font-bold mb-1 ${noBorder ? 'font-medium text-gray-500 normal-case tracking-normal mb-0.5' : ''}`}>{label}</p>
                <p className={`font-mono text-base text-gray-900 break-all leading-relaxed font-sans ${noBorder ? 'font-bold font-sans' : ''} ${isPurpose ? 'whitespace-pre-line' : ''}`}>{value}</p>
            </div>
        </div>

        <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all shrink-0 ${!noBorder ? (highlight ? 'bg-white text-amber-700 shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900') : 'text-gray-400 hover:text-amber-600'}`}>
            {copied ? (
                <div className="flex items-center gap-1.5 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wide">Copied</span>
                </div>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    {copyLabel && <span className="text-xs font-bold uppercase tracking-wide">{copyLabel}</span>}
                </>
            )}
        </button>
    </div>
);

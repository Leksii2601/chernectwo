import React from 'react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

interface ContactsTabProps {
    socialLinks: any[];
    submitStatus: 'idle' | 'success' | 'error';
    setSubmitStatus: (status: 'idle' | 'success' | 'error') => void;
    isSubmitting: boolean;
    setIsSubmitting: (submitting: boolean) => void;
    formData: { name: string; email: string; message: string };
    setFormData: (data: { name: string; email: string; message: string }) => void;
    formError: string;
    setFormError: (error: string) => void;
}

export const ContactsTab: React.FC<ContactsTabProps> = ({
    socialLinks,
    submitStatus,
    setSubmitStatus,
    isSubmitting,
    setIsSubmitting,
    formData,
    setFormData,
    formError,
    setFormError
}) => {
    const { t, language } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');

        try {
            const res = await fetch('/api/submit-question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    question: formData.message
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setFormError('Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 animate-in fade-in duration-500">
            <div className="space-y-8">
                <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                        {language === 'UA' ? 'Адреса' : 'Address'}
                    </h4>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight tracking-tight whitespace-pre-line">
                        {t('contacts.address_val')}
                    </p>
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                        {language === 'UA' ? 'Телефон' : 'Phone'}
                    </h4>
                    <a href="tel:+380671042288" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-amber-600 transition-colors tracking-tight">
                        +38 (067) 104 22 88
                    </a>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                        {language === 'UA' ? 'Електронна пошта' : 'Email'}
                    </h4>
                    <a href="mailto:chernectwo@gmail.com" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-amber-600 transition-colors break-all tracking-tight">
                        chernectwo@gmail.com
                    </a>
                </div>

                <div className="pt-8 border-t border-gray-100">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                        {language === 'UA' ? 'Ми у соцмережах' : 'Social Media'}
                    </h4>
                    <div className="flex gap-4">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all rounded-full"
                                title={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest leading-none">
                    {language === 'UA' ? 'Форма звернення' : 'Message Form'}
                </h3>

                {submitStatus === 'success' ? (
                    <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 animate-in fade-in zoom-in duration-500">
                        <h4 className="text-amber-900 font-bold mb-2">
                            {language === 'UA' ? 'Дякуємо!' : 'Thank you!'}
                        </h4>
                        <p className="text-amber-800 text-sm">
                            {language === 'UA'
                                ? 'Ваше повідомлення успішно надіслано. Ми відповімо вам найближчим часом.'
                                : 'Your message has been sent successfully. We will get back to you soon.'}
                        </p>
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="mt-6 text-[10px] font-bold uppercase tracking-widest text-amber-900 underline underline-offset-4"
                        >
                            {language === 'UA' ? 'Написати ще' : 'Send another'}
                        </button>
                    </div>
                ) : (
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    {language === 'UA' ? "Ваше ім'я" : "Your Name"}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                {language === 'UA' ? 'Повідомлення' : 'Message'}
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all resize-none bg-transparent"
                            />
                        </div>

                        {formError && (
                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{formError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={clsx(
                                "bg-black text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                isSubmitting && "animate-pulse"
                            )}
                        >
                            {isSubmitting
                                ? (language === 'UA' ? 'Надсилається...' : 'Sending...')
                                : (language === 'UA' ? 'Надіслати' : 'Send')}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

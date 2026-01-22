'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });

  const faqData = [
    {
      question: "Як подати записку за здоров’я у монастирі?",
      answer: "Щоб подати записку у Жидичинському монастирі, Вам необхідно приїхати в обитель і в одному із храмів написати записку з іменами людей, за яких буде здійснюватися молитва."
    },
    {
      question: "Коли відбувається богослужіння у монастирі?",
      answer: "Актуальний графік богослужінь представлено на сайті. Щоденно в будні дні відбувається Божественна літургія о 08.00 год. та вечірня о 18.00 год. У суботу Божественна літургія о 09.00 год. та вечірня о 18.00 год. У неділю Божественна літургія о 10.00 год. та акафіст до Богородиці о 18.00 год."
    },
    {
      question: "Чи можна посповідатися і причаститися у монастирі?",
      answer: "Так, можна. Щоденно в будні дні о 08.00 год., у суботу о 09.00 год., а в неділю о 10.00 год. відбувається Божественна літургія з можливістю сповіді та причастя вірних."
    },
    {
      question: "Яка вартість подачі записки чи інших треб у монастирі?",
      answer: "У нашому монастирі немає встановлених цін на треби чи подання записок. Ви самостійно визначаєте розмір внеску, виходячи з ваших можливостей і поклику серця."
    },
     {
      question: "Чи можна охрестити дитину, повінчатися у монастирі?",
      answer: (
        <>
          Так, можна. Для цього необхідний попередній запис на здійснення таїнства. Приїдьте особисто в обитель або зателефонуйте за номером{' '}
          <a href="tel:+380671042288" className="text-amber-600 hover:text-amber-700 underline">
            +380671042288
          </a>.
        </>
      )
    },
    {
        question: "Чи можна освятити автомобіль, будинок, ікону у монастирі?",
        answer: "Так, можна. Для цього Вам необхідно приїхати в обитель на Божественну літургію і повідомити волонтерів або братію монастиря до початку богослужіння про ваші наміри."
    },
    {
        question: "Чи можна подати записку на невсипущий псалтир у монастирі?",
        answer: "У монастирі не читається невсипущий псалтир. Це притаманно лише для монастирів з великою чисельністю братії. Ви можете просто подати записку за здоров’я Ваших рідних чи близьких."
    },
    {
      question: "Як доїхати до монастиря?",
      answer: (
        <>
          Обитель має зручну транспортну доступність. Базові варіанти доїзду представлено за посиланням.{' '}
          <a href="https://zhydychyn.center/pages/travallerInfo/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline break-all">
            https://zhydychyn.center/pages/travallerInfo/
          </a>
        </>
      )
    },
    {
        question: "Який графік руху монастирського автобуса?",
        answer: "У неділю та святкові дні монастир організовує доїзд вірян на богослужіння та у зворотному напрямку власним транспортом. Графік та маршрут руху: с. Прилуцьке о 8:40 / 40-й А квартал о 9:00 / пр. Соборності (магазин Троянда) о 9:07 / К-тр «Промінь» (зупинка вул. Стрілецька) о 9:20 / Вишків о 9:25"
    },
    {
        question: "Залишилися запитання?",
        isForm: true
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.question) {
        alert('Будь ласка, заповніть всі поля');
        return;
    }

    try {
        const res = await fetch('/api/submit-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            alert('Дякуємо! Ваше питання отримано.');
            setFormData({ name: '', email: '', question: '' });
        } else {
            alert('Сталася помилка. Спробуйте пізніше.');
        }
    } catch (err) {
        console.error(err);
        alert('Сталася помилка. Спробуйте пізніше.');
    }
  };

  return (
    <section className="bg-white text-black py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Info */}
            <div className="flex flex-col gap-6 lg:gap-8 max-w-xl">
                 <div className="mb-4">
                     <h2 className="font-montserrat font-bold text-4xl md:text-5xl uppercase tracking-widest text-left text-gray-900 border-b-2 border-black inline-block pb-2">
                        Жидичинський<br/>монастир
                     </h2>
                 </div>
                 
                 <div className="text-base md:text-lg font-light text-gray-700 space-y-6">
                    <p className="font-medium text-black text-xl">
                        Жидичинський Свято-Миколаївський монастир — простір молитви, спокою та духовної сили, що має тисячолітню історію.
                    </p>
                    <p>
                        Обитель є одним із найдавніших центрів православ’я на Волині. Тут зберігаються святині, шануються традиції та звершується щоденна молитва за мир і благополуччя.
                        Монастир відкритий для всіх, хто шукає Бога, потребує духовної поради чи просто хоче відпочити душею у тиші святих стін.
                    </p>
                    
                    <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden space-y-6">
                            <p>
                                Ми прагнемо, щоб кожен паломник відчував себе тут як вдома. Саме тому ми підготували відповіді на найпоширеніші запитання, які допоможуть вам підготуватися до візиту.
                            </p>
                             <p>
                                Братія монастиря завжди рада вітати прочан та гостей обителі. Ви можете долучитися до богослужінь, поспілкуватися з духівниками та знайти відповіді на важливі життєві питання.
                            </p>
                        </div>
                    </div>
                 </div>
                 
                 <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group flex items-center gap-2 mt-4 text-base font-medium text-black hover:text-amber-600 transition-colors bg-transparent border-none p-0 cursor-pointer"
                 >
                    <span>{isExpanded ? 'Згорнути' : 'Читати більше'}</span>
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 transition-transform" />
                    ) : (
                        <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                    )}
                 </button>
            </div>

            {/* Right Column: FAQ */}
            <div className="w-full">
                <h3 className="font-montserrat text-3xl md:text-4xl mb-8 md:mb-12 font-medium">
                    Часті питання
                </h3>
                <div className="border-t border-gray-300">
                    {faqData.map((item, index) => (
                        <div key={index} className="border-b border-gray-300">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full py-4 flex justify-between items-center text-left hover:text-amber-600 transition-colors group select-none"
                            >
                                <span className="text-base md:text-lg font-medium pr-8">{item.question}</span>
                                
                                {/* Custom Plus/Minus Animation */}
                                <div className={`relative w-6 h-6 flex-shrink-0 cursor-pointer ${openIndex === index ? 'active' : ''}`}>
                                    <span 
                                        className={`block bg-black absolute top-1/2 left-0 w-full h-[2px] transition-all duration-300 ease-in-out ${openIndex === index ? '-rotate-90 opacity-0' : '-translate-y-1/2'}`}
                                    />
                                    <span 
                                        className={`block bg-black absolute top-1/2 left-0 w-full h-[2px] transition-all duration-300 ease-in-out ${openIndex === index ? 'rotate-0' : 'rotate-90 -translate-y-1/2'}`} 
                                    />
                                </div>
                            </button>
                            
                            <div
                                className={`
                                    grid transition-all duration-500 ease-in-out
                                    ${openIndex === index ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'}
                                `}
                            >
                                <div className="overflow-hidden">
                                     {item.isForm ? (
                                        <div className="space-y-4 pt-2">
                                            <input 
                                                type="text" 
                                                placeholder="Ваше ім'я" 
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-amber-600 transition-colors text-sm"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                            <input 
                                                type="email" 
                                                placeholder="Ваш email" 
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-amber-600 transition-colors text-sm"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                            <textarea 
                                                placeholder="Ваше питання" 
                                                rows={4}
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-amber-600 transition-colors text-sm resize-none"
                                                value={formData.question}
                                                onChange={(e) => setFormData({...formData, question: e.target.value})}
                                            />
                                            <button 
                                                onClick={handleSubmit} 
                                                className="bg-black text-white px-6 py-2 uppercase text-sm font-bold tracking-wider hover:bg-amber-600 transition-colors"
                                            >
                                                Надіслати
                                            </button>
                                        </div>
                                     ) : (
                                        <div className="text-gray-600 text-sm md:text-base leading-relaxed">
                                            {item.answer}
                                        </div>
                                     )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}

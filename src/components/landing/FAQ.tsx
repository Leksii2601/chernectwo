'use client';

import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "Як подати записку за здоров’я у монастирі?",
      answer: "Щоб подати записку у Жидичинському монастирі, Вам необхідно приїхати в обитель і в одному із храмів написати записку з іменами людей, за яких буде здійснюватися молитва."
    },
    {
      question: "Коли відбувається богослужіння у монастирі?",
      answer: "Актуальний графік богослужінь представлено на сайті.\nЩоденно в будні дні відбувається Божественна літургія о 08.00 год. та вечірня о 18.00 год. У суботу Божественна літургія о 09.00 год. та вечірня о 18.00 год. У неділю Божественна літургія о 10.00 год. та акафіст до Богородиці о 18.00 год."
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
      question: "Чи можна замовити екскурсію монастирем?",
      answer: (
        <>
          Так. В обителі діє Центр туристичної інформації та паломництва. Вони займаються прийомом паломників і проведенням екскурсій. Детальна інформація про об’єкти показу та діяльність Центру на сайті{' '}
          <a href="https://zhydychyn.center" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">
            zhydychyn.center
          </a>
          {' '}або за телефоном{' '}
          <a href="tel:+380671042288" className="text-orange-500 hover:text-orange-600 underline">
            +380671042288
          </a>
        </>
      )
    },
    {
      question: "Чи можна охрестити дитину, повінчатися, пособоруватися у вашому монастирі?",
      answer: (
        <>
          Так, можна. Для цього необхідний попередній запис на здійснення таїнства. Приїдьте особисто в обитель або зателефонуйте за номером{' '}
          <a href="tel:+380671042288" className="text-orange-500 hover:text-orange-600 underline">
            +380671042288
          </a>.
        </>
      )
    },
    {
      question: "Чи можна освятити автомобіль, будинок, ікону, хрестик у монастирі?",
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
          <a href="https://zhydychyn.center/pages/travallerInfo/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline break-all">
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.question) {
      console.log('Form submitted:', formData);
      alert('Ваше запитання надіслано!');
      setFormData({ name: '', email: '', question: '' });
    } else {
      alert('Будь ласка, заповніть всі поля');
    }
  };

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 animate-fadeInUp text-center">
          <h1 className="font-montserrat font-bold text-3xl md:text-5xl uppercase tracking-widest text-black mb-10">
            ЧАСТІ ЗАПИТАННЯ
          </h1>
        </div>

        <div className="space-y-0">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="border-t border-gray-300 transition-all duration-300 hover:border-gray-400 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-8 flex justify-between items-center hover:bg-gray-50 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-left pr-4 transition-colors duration-300 text-black">
                  {item.question}
                </h2>
                <div className="flex-shrink-0 relative w-8 h-8">
                  <svg 
                    className="w-8 h-8 text-orange-500 absolute inset-0 transition-all duration-500 ease-in-out"
                    style={{
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      opacity: 1
                    }}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`pb-8 transform transition-all duration-700 ${
                  openIndex === index ? 'translate-y-0' : '-translate-y-4'
                }`}>
                  {item.isForm ? (
                    <div className="space-y-6 animate-fadeInUp">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="transform transition-all duration-300 hover:scale-105">
                          <label className="block text-sm font-medium mb-2 text-black">
                            Як до вас звертатися?
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Ім'я та прізвище"
                            className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 rounded-lg"
                          />
                        </div>
                        <div className="transform transition-all duration-300 hover:scale-105">
                          <label className="block text-sm font-medium mb-2 text-black">
                            Електронна пошта
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="Ваш email"
                            className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-105">
                        <label className="block text-sm font-medium mb-2 text-black">
                          Ваше запитання
                        </label>
                        <textarea
                          value={formData.question}
                          onChange={(e) => setFormData({...formData, question: e.target.value})}
                          placeholder="Опишіть суть вашого запитання"
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300 rounded-lg"
                        />
                      </div>

                      <div className="flex justify-center pt-4">
                        <button
                          onClick={handleSubmit}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-lg font-medium transition-all duration-300 rounded-full hover:shadow-lg transform hover:scale-105 active:scale-95"
                        >
                          Відправити
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 text-center">
                        Натискаючи кнопку, я підтверджую правдивість та актуальність інформації, яку надаю. Також погоджуюся на обробку персональних даних відповідно до умов{' '}
                        <a href="#" className="underline hover:text-orange-500 transition-colors duration-300">Політики конфіденційності</a>.
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg leading-relaxed whitespace-pre-line text-gray-700 animate-fadeInUp">
                      {item.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

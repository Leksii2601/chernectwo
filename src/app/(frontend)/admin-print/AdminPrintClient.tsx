'use client';

import React, { useState } from 'react';

type Counts = {
  total: number
  health: number
  repose: number
}

export const AdminPrintClient = ({ counts }: { counts: Counts }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // This function doesn't actually print directly, it opens the API endpoint which generates PDF and deletes records
  const handlePrint = (type?: 'health' | 'repose', limit: number | 'all' = 10) => {
    let message = 'Увага! Ця дія:\n';
    
    let label = '';
    if (!type) label = 'БУДЬ-ЯКОГО типу';
    if (type === 'health') label = 'за ЗДОРОВ\'Я';
    if (type === 'repose') label = 'за УПОКІЙ';

    const countLabel = limit === 'all' ? 'ВСІ (але не більше 100)' : `${limit}`;

    message += `1. Згенерує PDF файл із ${countLabel} записками ${label}.\n`;
    message += `2. Позначить ці записки як "РОЗДРУКОВАНІ" (вони зникнуть зі списку друку, але залишаться в базі).\n\n`;
    message += `Ви впевнені, що принтер готовий і ви хочете продовжити?`;

    if (!confirm(message)) {
        return;
    }

    setIsProcessing(true);

    // Build URL
    let url = `/api/print-prayers?limit=${limit}`;
    if (type) {
        url += `&type=${type}`;
    }

    // Open in new tab
    window.open(url, '_blank');

    // Reload info after delay
    setTimeout(() => {
        setIsProcessing(false);
        window.location.reload();
    }, 4000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4 w-full text-center">
            Панель друку записок 
        </h1>
        
        {/* Statistics Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                <span className="block text-4xl font-bold text-blue-600 mb-2">{counts.total}</span>
                <span className="text-sm font-bold text-blue-800 uppercase tracking-wider">Всього записок</span>
            </div>
            <div className="bg-red-50 p-6 rounded-xl text-center border border-red-100">
                <span className="block text-4xl font-bold text-red-600 mb-2">{counts.health}</span>
                <span className="text-sm font-bold text-red-800 uppercase tracking-wider">За Здоров&apos;я</span>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl text-center border border-gray-200">
                <span className="block text-4xl font-bold text-gray-600 mb-2">{counts.repose}</span>
                <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">За Упокій</span>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-8 w-full">
            
            {/* Standard Options */}
            <div>
                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Швидкий друк (по 5 шт)</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => handlePrint(undefined, 5)}
                        disabled={isProcessing || counts.total === 0}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Змішані (5 шт)
                    </button>
                    <button 
                         onClick={() => handlePrint('health', 5)}
                         disabled={isProcessing || counts.health === 0}
                         className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        За здоров&apos;я (5 шт)
                    </button>
                    <button 
                         onClick={() => handlePrint('repose', 5)}
                         disabled={isProcessing || counts.repose === 0}
                         className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        За упокій (5 шт)
                    </button>
                </div>
            </div>

            {/* Mass Actions */}
            <div className="border-t pt-8">
                <h3 className="text-lg font-bold text-amber-700 mb-4 text-center">Масовий друк (Всі доступні)</h3>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
                    <p className="text-sm text-amber-800 mb-4">
                        Буде згенеровано PDF з усіма записками (ліміт 100 на один файл). <br/>
                        Вони будуть позначені як <strong>роздруковані</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <button 
                            onClick={() => handlePrint('health', 'all')}
                            disabled={isProcessing || counts.health === 0}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Всі &quot;За Здоров&apos;я&quot;
                        </button>
                        <button 
                             onClick={() => handlePrint('repose', 'all')}
                             disabled={isProcessing || counts.repose === 0}
                             className="bg-red-900 hover:bg-red-950 text-white font-bold py-3 px-6 rounded shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Всі &quot;За Упокій&quot;
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
  );
};

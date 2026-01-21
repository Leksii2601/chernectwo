'use client';
import { PrintButton } from '@/components/PrintButton';

export default function AdminPrintPage() {
    return (
        <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Друк молитовних записок</h1>
                <p className="mb-8 text-gray-600 max-w-md text-center">
                    Натисніть кнопку нижче, щоб згенерувати PDF із 5 найстарішими записками (формат 5 смужок на А4) та видалити їх із бази даних.
                </p>
                <PrintButton />
                <p className="mt-4 text-xs text-gray-400">
                   Увага: Дія незворотна.
                </p>
            </div>
        </div>
    )
}

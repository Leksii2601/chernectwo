'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Link as LinkIcon, Check, Facebook, Send } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [canShareNative, setCanShareNative] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
        setCanShareNative(true);
    }
  }, []);

  const handleNativeShare = async () => {
    const shareData = {
      title: title,
      text: title, 
      url: currentUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!currentUrl) return null; 

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-2">
      {/* Native Share Button (Mobile/Supported) */}
      {canShareNative && (
        <button 
          onClick={handleNativeShare}
          className="flex items-center gap-2 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 px-4 py-2 rounded-full transition-colors font-bold text-xs uppercase tracking-wide"
          title="Поділитись"
        >
           <Share2 className="w-4 h-4" />
           <span className="hidden sm:inline">Поділитись</span>
        </button>
      )}

      {/* Facebook */}
      <a 
        href={fbShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-full transition-colors"
        title="Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      {/* Telegram */}
       <a 
        href={tgShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-full transition-colors"
        title="Telegram"
      >
        <Send className="w-5 h-5 -ml-1" />
      </a>

      {/* Copy Link Fallback */}
      <button 
        onClick={handleCopy}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-colors"
        title="Копіювати посилання"
      >
        {isCopied ? <Check className="w-5 h-5 text-green-600" /> : <LinkIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

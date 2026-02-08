'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Stage 1: Curtain starts moving + Background starts reveal
    const stage1 = setTimeout(() => setRevealStage(1), 50);
    // Stage 2: Small front photo reveal starts
    const stage2 = setTimeout(() => setRevealStage(2), 600);
    // Stage 3: Text reveal starts
    const stage3 = setTimeout(() => setRevealStage(3), 1500);
    // Stage 4: Header reveal + Full unlock
    const stage4 = setTimeout(() => setRevealStage(4), 2800);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(stage4);
      document.body.classList.remove('intro-active');
    };
  }, []);

  useEffect(() => {
    if (revealStage < 4) {
      document.body.classList.add('intro-active');
    } else {
      document.body.classList.remove('intro-active');
    }
  }, [revealStage]);

  const curtainDuration = 1400;
  const easeRef = "cubic-bezier(0.77, 0, 0.175, 1)";
  const easeExpo = "cubic-bezier(0.19, 1, 0.22, 1)";

  // If hero title translation contains \n, we split it for better layout
  const titleLines = t('hero.title').split('\n');

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${revealStage < 4 ? 'intro-active' : ''}`}>

      {/* Curtain - Reveals the site */}
      <aside
        className="fixed inset-0 z-[1000] bg-white pointer-events-none"
        style={{
          transition: `transform ${curtainDuration}ms ${easeRef}`,
          transform: (mounted && revealStage >= 1) ? 'translate3d(100%, 0, 0)' : 'translate3d(0, 0, 0)',
          willChange: 'transform'
        }}
      />

      {/* Background Slit-Reveal */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transition: `transform ${curtainDuration}ms ${easeRef}`,
          transform: revealStage >= 1 ? 'translate3d(0%, 0, 0)' : 'translate3d(-100%, 0, 0)',
          willChange: 'transform'
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transition: `transform ${curtainDuration}ms ${easeRef}`,
            transform: revealStage >= 1 ? 'translate3d(0%, 0, 0)' : 'translate3d(100%, 0, 0)',
            willChange: 'transform'
          }}
        >
          <div className="relative w-full h-full scale-[1.02]">
            <Image
              src="/media/pic_1.jpg"
              alt="Monastery Background"
              fill
              priority
              quality={95}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </div>
      </div>

      {/* Front Photo Reveal */}
      <div
        className="absolute right-[10%] top-[20%] bottom-[20%] w-[35%] z-10 overflow-hidden pointer-events-none hidden lg:block"
        style={{
          transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
          willChange: 'transform'
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transition: `transform 1600ms ${easeRef}`,
            transform: revealStage >= 2 ? 'translate3d(0%, 0, 0)' : 'translate3d(101%, 0, 0)',
            willChange: 'transform'
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              transition: `transform 1600ms ${easeRef}`,
              transform: revealStage >= 2 ? 'translate3d(0%, 0, 0)' : 'translate3d(-101%, 0, 0)',
              willChange: 'transform'
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transition: `transform 2200ms ${easeExpo}`,
                transform: revealStage >= 2 ? 'scale(1)' : 'scale(1.2)',
                willChange: 'transform'
              }}
            >
              <Image
                src="/media/pic_1.jpg"
                alt="Monastery Detail"
                fill
                priority
                quality={95}
                className="object-cover"
                sizes="35vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-20 h-full flex items-center px-6 md:px-12 lg:px-20 pointer-events-none">
        <div className="w-full max-w-xl lg:max-w-[50%] pointer-events-auto">
          <div
            style={{
              transition: revealStage >= 3 ? `opacity 1800ms ${easeExpo}` : `transform 1800ms ${easeExpo}, opacity 1800ms ${easeExpo}`,
              transform: revealStage >= 3
                ? `translate3d(0, ${-scrollY * 0.2}px, 0)`
                : 'translate3d(0, 100px, 0)',
              opacity: revealStage >= 3 ? 1 : 0,
              willChange: 'transform, opacity'
            }}
          >
            <h1 className="font-montserrat font-light uppercase tracking-[0.1em] leading-tight text-white mb-6">
              {titleLines.map((line: string, i: number) => (
                <span
                  key={i}
                  className={`block ${i === 0
                    ? 'text-4xl md:text-6xl lg:text-7xl font-normal mb-2'
                    : 'text-sm md:text-xl lg:text-2xl opacity-70 font-light tracking-[0.2em]'
                    }`}
                >
                  {line}
                </span>
              ))}
            </h1>
            <div
              className="h-[2px] bg-amber-500 origin-left"
              style={{
                width: revealStage >= 3 ? '120px' : '0',
                transition: `width 2000ms ${easeExpo}`,
                transitionDelay: '500ms'
              }}
            />


          </div>
        </div>
      </div>


      <style jsx global>{`
                /* Hide Header components during intro stages 0-3 */
                .intro-active div.z-\[511\],
                .intro-active div.z-\[510\],
                .intro-active header.z-\[500\],
                .intro-active div.z-\[500\],
                .intro-active button.z-\[520\],
                .intro-active .fixed.top-6,
                .intro-active .fixed.top-14 {
                    opacity: 0 !important;
                    pointer-events: none !important;
                    transition: none !important; 
                }

                /* Lock header position/entrance for transition */
                .intro-active div.z-\[510\], .intro-active div.z-\[511\], .intro-active .fixed.top-6, .intro-active .fixed.top-14 { 
                    transform: translate(-50%, -100px) !important; 
                }
                .intro-active header.z-\[500\], .intro-active div.z-\[500\], .intro-active button.z-\[520\] { 
                    transform: translate(-50%, 100px) !important; 
                }

                @font-face {
                    font-family: 'KyivTypeTitling';
                    src: url('/fonts/KyivTypeTitling-VarGX.ttf') format('truetype');
                    font-weight: 100 900;
                    font-style: normal;
                }
            `}</style>
    </div>
  );
}

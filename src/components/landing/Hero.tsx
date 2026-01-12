'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import Image from 'next/image'

const slides = [
  '/media/hero-1.jpg',
  '/media/hero-2.png',
  '/media/hero-3.jpg',
  '/media/hero-4.png',
  '/media/hero-5.png',

]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={clsx(
            'absolute inset-0 transition-opacity duration-[2000ms] ease-in-out',
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={slide}
            alt="Monastery Background"
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Gradient Overlay requested by user */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 mix-blend-multiply" /> 
          <div className="absolute inset-0 bg-black/40" /> {/* General dimming */}
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center w-full max-w-[95%] 2xl:max-w-[1800px]">
          
          {/* Left: Title */}
          <div className="text-center lg:text-right">
             <h1 className="font-molodo text-4xl md:text-7xl lg:text-7xl leading-none uppercase tracking-wider drop-shadow-lg">
               Жидичинський <br />
               Свято-Миколаївський <br />
               Монастир
             </h1>
          </div>

          {/* Divider: Vertical Line */}
          <div className="hidden lg:block w-[1px] h-64 bg-white/50 mx-auto"></div>

          {/* Right: Description + Button */}
          <div className="text-center lg:text-left max-w-md mx-auto lg:mx-0">
            <p className="text-2xl md:text-xl font-light mb-8 opacity-90 leading-relaxed">
             - один із найдавніших діючих монастирів Православної Церкви України, що бере свій початок з часів Київської Русі.
            </p>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator (Optional but good for UX) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
         {slides.map((_, idx) => (
           <button
             key={idx}
             onClick={() => setCurrentSlide(idx)}
             className={clsx(
               "w-2 h-2 rounded-full transition-all",
               currentSlide === idx ? "bg-white w-6" : "bg-white/50"
             )}
           />
         ))}
      </div>
    </div>
  )
}

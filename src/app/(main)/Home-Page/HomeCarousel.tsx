"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { getCarouselSlidesAction } from "@/controllers/carousel";

export function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSlides() {
      const result = await getCarouselSlidesAction();
      if (result.success && result.data && result.data.length > 0) {
        setSlides(result.data);
      }
      setLoading(false);
    }
    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
     return <div className="w-full aspect-video min-h-[300px] bg-slate-50 animate-pulse rounded-2xl mb-16" />;
  }

  return (
    <div className="relative w-full bg-white">
      {/* Main Carousel Container */}
      <div className="relative w-full aspect-video min-h-[300px] overflow-hidden group rounded-2xl bg-slate-50">
        {slides.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-4">
             <ImageIcon size={64} strokeWidth={1} />
             <p className="text-sm font-bold uppercase tracking-widest">Welcome to SDO Imus City</p>
          </div>
        ) : (
          slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))
        )}

        {/* Minimal Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/80 backdrop-blur-md text-white hover:text-slate-900 rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/80 backdrop-blur-md text-white hover:text-slate-900 rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Centered Pagination Dots Below */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-10 bg-[#191970]" : "w-3 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}



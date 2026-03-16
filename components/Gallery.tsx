"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const slides = [
  {
    caption: "Injection Molding",
    src: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80",
  },
  {
    caption: "Tool & Die Engineering",
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  },
  {
    caption: "Secondary Operations",
    src: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=800&q=80",
  },
  {
    caption: "Quality Inspection",
    src: "https://images.unsplash.com/photo-1581091215367-9b6c00b3035a?w=800&q=80",
  },
  {
    caption: "Material Expertise",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    caption: "OEM Production",
    src: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80",
  },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => { prev(); startAuto(); };
  const handleNext = () => { next(); startAuto(); };
  const handleDot = (i: number) => { setCurrent(i); startAuto(); };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Capabilities</h2>
          <div className="mx-auto h-1 w-16 rounded bg-[#7B1C1C]" />
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden rounded-xl shadow-lg"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 absolute inset-0"}`}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Caption */}
                <div className="absolute bottom-6 left-6">
                  <span className="text-white text-xl font-semibold drop-shadow-lg">
                    {slide.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Arrow buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === current ? "bg-[#7B1C1C]" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

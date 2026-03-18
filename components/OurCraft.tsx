"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const PartViewer = dynamic(() => import("./PartViewer"), { ssr: false });

export function OurCraft() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(section);

    const onScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const sectionH = section.offsetHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowH - rect.top) / (windowH + sectionH))
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] min-h-[600px] lg:min-h-[700px] flex items-center"
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Mobile: part on top */}
          <div className="block lg:hidden relative w-full" style={{ height: 280 }}>
            <PartViewer scrollProgress={scrollProgress} visible={visible} isMobile={true} />
          </div>

          {/* Left: text */}
          <div className="flex flex-col justify-center py-8 lg:py-20 pr-0 lg:pr-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#990000]">
              Our Craft
            </p>
            <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              PRECISION MANUFACTURING
              <span className="block text-xl sm:text-3xl lg:text-4xl mt-2 text-gray-300">
                30 Years of Machined Excellence
              </span>
            </h2>
            <p className="mt-6 text-base lg:text-lg leading-7 text-gray-400 max-w-lg">
              From plastic injection molding on 40–150 ton presses to in-house CNC
              machining, Parker Precision brings three decades of hands-on
              manufacturing expertise to every part we produce.
            </p>
            <p className="mt-3 text-base lg:text-lg leading-7 text-gray-400 max-w-lg">
              Tight tolerances. Consistent quality. No outsourcing.
            </p>
          </div>

          {/* Right: 3D part — desktop only */}
          <div className="hidden lg:block relative w-full h-full min-h-[600px]">
            <PartViewer scrollProgress={scrollProgress} visible={visible} isMobile={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

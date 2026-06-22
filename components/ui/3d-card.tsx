"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// Tilt3D — reusable primitive
// -------------------------------------------------------------------------
type Tilt3DProps = {
  children: React.ReactNode;
  /** Max rotation in degrees on each axis. @default 12 */
  maxTilt?: number;
  /** Scale applied on hover. @default 1.02 */
  hoverScale?: number;
  /** Perspective in px applied to the parent. @default 1000 */
  perspective?: number;
  className?: string;
  /** Optional className applied to the outer perspective wrapper */
  wrapperClassName?: string;
};

export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  maxTilt = 12,
  hoverScale = 1.02,
  perspective = 1000,
  className,
  wrapperClassName,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / height) * maxTilt;
    const rotateY = ((x - width / 2) / width) * -maxTilt;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hoverScale})`;
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      className={cn("w-full", wrapperClassName)}
      style={{ perspective: `${perspective}px` }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "transition-transform duration-300 ease-out will-change-transform",
          className,
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};

// -------------------------------------------------------------------------
// Floating3DCard — original demo, brand-adapted to Maison Lumèra
// -------------------------------------------------------------------------
export const Floating3DCard: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-cream text-espresso">
      <Tilt3D
        wrapperClassName="flex w-full justify-center px-4 sm:px-6 md:px-8"
        className="group relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-sm border border-border bg-cream p-6 shadow-lg hover:shadow-xl"
      >
        <h2
          className="font-serif text-2xl text-espresso sm:text-3xl"
          style={{ transform: "translateZ(50px)" }}
        >
          Усетете го по-близо.
        </h2>

        <p
          className="mt-2 text-sm text-taupe sm:text-base"
          style={{ transform: "translateZ(60px)" }}
        >
          Минете с курсора върху картата, за да видите бутилката в дълбочина.
        </p>

        <div className="mt-6 w-full px-2" style={{ transform: "translateZ(100px)" }}>
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
            alt="Maison Lumèra fragrance bottle"
            className="h-48 w-full rounded-sm object-cover transition-shadow duration-300 sm:h-60 group-hover:shadow-xl"
          />
        </div>

        <div className="mt-8 flex sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <a
            href="#collection"
            className="rounded-xl px-4 py-2 text-xs font-medium text-taupe transition-colors duration-300 hover:text-camel sm:text-sm cursor-pointer"
            style={{ transform: "translateZ(20px)" }}
          >
            Виж колекцията →
          </a>
          <button
            className="rounded-sm bg-espresso px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream transition-colors duration-300 hover:bg-camel sm:text-sm cursor-pointer"
            style={{ transform: "translateZ(20px)" }}
          >
            Поръчай
          </button>
        </div>
      </Tilt3D>
    </div>
  );
};

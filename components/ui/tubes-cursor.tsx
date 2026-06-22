'use client';

import { useEffect, useRef } from 'react';

type TubesApp = {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
  dispose?: () => void;
};

type TubesCursorOptions = {
  tubes: {
    colors: string[];
    lights: { intensity: number; colors: string[] };
  };
};

type TubesCursorFactory = (canvas: HTMLCanvasElement, opts: TubesCursorOptions) => TubesApp;

// Light beige / cream / off-white palette — glows softly on warm dark taupe.
const WARM_PALETTE = [
  '#FAF6F0', // cream
  '#F2EBE0', // sand
  '#E8DECF', // bone
  '#D4C7B0', // warm linen
  '#FFFFFF', // pure white
  '#EFE6D8', // ivory
  '#DCCFB6', // antique
  '#F5E6D3', // soft beige
];

const pickWarm = (count: number) =>
  Array.from({ length: count }, () => WARM_PALETTE[Math.floor(Math.random() * WARM_PALETTE.length)]);

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesApp | null>(null);

  useEffect(() => {
    // Hide the dynamic CDN URL from webpack's static analyzer with Function()
    // — webpack won't try to bundle/resolve it and the browser handles it natively.
    const importFromUrl = new Function('u', 'return import(u)') as (
      u: string,
    ) => Promise<{ default: TubesCursorFactory }>;

    const t = setTimeout(() => {
      importFromUrl(
        'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js',
      )
        .then((mod) => {
          if (!canvasRef.current) return;
          appRef.current = mod.default(canvasRef.current, {
            tubes: {
              colors: ['#FAF6F0', '#E8DECF', '#D4C7B0'],
              lights: {
                intensity: 180,
                colors: ['#FFFFFF', '#FAF6F0', '#F0E3D0', '#E8DECF'],
              },
            },
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('TubesCursor load failed:', err);
        });
    }, 100);

    return () => {
      clearTimeout(t);
      appRef.current?.dispose?.();
    };
  }, []);

  const handleClick = () => {
    if (!appRef.current) return;
    appRef.current.tubes.setColors(pickWarm(3));
    appRef.current.tubes.setLightsColors(pickWarm(4));
  };

  return (
    <section
      id="experience"
      onClick={handleClick}
      className="relative h-screen w-full overflow-hidden cursor-pointer select-none"
      style={{ background: '#2D2520' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden />

      {/* Soft vignette so type sits cleanly over the tubes */}
      <div
        aria-hidden
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(45,37,32,0.65) 90%)',
        }}
      />

      {/* Hairline ornament — same vocabulary as the rest of the site */}
      <div
        aria-hidden
        className="absolute top-12 left-1/2 -translate-x-1/2 z-10 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent pointer-events-none"
      />

      <div className="relative h-full flex flex-col items-center justify-center gap-6 z-10 px-6 text-center pointer-events-none">
        <p className="text-[11px] uppercase tracking-widest text-gold">
          В сърцето на формулата
        </p>
        <h2
          className="font-serif font-light text-cream tracking-tight leading-[0.95]"
          style={{
            fontSize: 'clamp(3rem, 9vw, 8rem)',
            textShadow: '0 0 40px rgba(42,31,24,0.6)',
          }}
        >
          Невидимата <em className="not-italic text-gold">материя</em>.
        </h2>
        <p
          className="font-serif italic text-cream/80 max-w-xl text-base md:text-lg leading-relaxed"
          style={{ textShadow: '0 0 30px rgba(42,31,24,0.7)' }}
        >
          Всеки аромат е разговор между молекули.
          <br />
          Преместете курсора — следвайте ги.
        </p>
        <p className="text-[10px] uppercase tracking-widest text-cream/45 mt-8 flex items-center gap-3">
          <span className="h-px w-6 bg-cream/30" />
          Кликнете, за да смените палитрата
          <span className="h-px w-6 bg-cream/30" />
        </p>
      </div>
    </section>
  );
}

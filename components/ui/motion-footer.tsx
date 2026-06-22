"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// THEME-ADAPTIVE INLINE STYLES — uses our shadcn-mapped Lumèra tokens
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-inter), 'Plus Jakarta Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;

  --pill-bg-1: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--foreground) 12%, transparent);
  --pill-highlight: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--foreground) 6%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 10%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 24%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--foreground) 18%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--background) 90%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.9; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.18); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}
.animate-footer-breathe { animation: footer-breathe 10s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 50s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 80px 80px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 22%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 16%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-family: var(--font-fraunces), Georgia, serif;
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 7%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 12%, transparent) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  font-family: var(--font-fraunces), Georgia, serif;
  font-weight: 300;
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 45%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 12%, transparent));
}
`;

// -------------------------------------------------------------------------
// MAGNETIC BUTTON
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// MAIN — branded for Maison Lumèra (BG copy, perfumery-appropriate CTAs)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Създадено в Грас</span> <span className="text-[color:var(--primary)] opacity-60">✦</span>
    <span>Майсторска парфюмерия</span> <span className="text-[color:var(--secondary)] opacity-60">✦</span>
    <span>Композирано на ръка</span> <span className="text-[color:var(--primary)] opacity-60">✦</span>
    <span>Партиди от 400 бутилки</span> <span className="text-[color:var(--secondary)] opacity-60">✦</span>
    <span>От 1948</span> <span className="text-[color:var(--primary)] opacity-60">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer
          className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden cinematic-footer-wrapper"
          style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            Lumèra
          </div>

          {/* Marquee */}
          <div
            className="absolute top-12 left-0 w-full overflow-hidden py-4 z-10 -rotate-2 scale-110 shadow-2xl"
            style={{
              borderTop: "1px solid color-mix(in oklch, var(--foreground) 8%, transparent)",
              borderBottom: "1px solid color-mix(in oklch, var(--foreground) 8%, transparent)",
              background: "color-mix(in oklch, var(--background) 70%, transparent)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="flex w-max animate-footer-scroll-marquee text-[10px] md:text-xs tracking-[0.32em] uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Main center content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="footer-text-glow text-5xl md:text-8xl tracking-tight mb-12 text-center leading-[0.95]"
            >
              Готови за първото <em className="not-italic" style={{ color: "var(--primary)" }}>докосване</em>?
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as="a"
                  href="#collection"
                  className="footer-glass-pill px-10 py-5 rounded-full font-medium text-sm md:text-base flex items-center gap-3 group"
                  style={{ color: "var(--foreground)" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />
                  </svg>
                  Разгледай колекцията
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="#"
                  className="footer-glass-pill px-10 py-5 rounded-full font-medium text-sm md:text-base flex items-center gap-3 group"
                  style={{ color: "var(--foreground)" }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
                    <circle cx="12" cy="10" r="3" strokeLinecap="round" />
                  </svg>
                  Намерете дистрибутор
                </MagneticButton>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                <MagneticButton
                  as="a"
                  href="#"
                  className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Поверителност
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#"
                  className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Условия за ползване
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#"
                  className="footer-glass-pill px-6 py-3 rounded-full font-medium text-xs md:text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Контакт
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div
              className="text-[10px] md:text-xs font-medium tracking-widest uppercase order-2 md:order-1"
              style={{ color: "var(--muted-foreground)" }}
            >
              © 2026 Maison Lumèra · Всички права запазени
            </div>

            <div
              className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default"
              style={{ borderColor: "color-mix(in oklch, var(--foreground) 8%, transparent)" }}
            >
              <span
                className="text-[10px] md:text-xs font-medium uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                Създадено с
              </span>
              <span
                className="animate-footer-heartbeat text-sm md:text-base"
                style={{ color: "var(--destructive)" }}
              >
                ❤
              </span>
              <span
                className="text-[10px] md:text-xs font-medium uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                в
              </span>
              <span
                className="font-serif italic text-xs md:text-sm tracking-normal ml-1"
                style={{ color: "var(--foreground)" }}
              >
                Грас
              </span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center group order-3"
              style={{ color: "var(--muted-foreground)" }}
              aria-label="Обратно нагоре"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { phases } from "@/lib/content";

type GsapCtx = { revert: () => void };

export default function Phases() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: GsapCtx | undefined;
    let onLoad: (() => void) | undefined;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          { isMobile: "(max-width: 700px)", isDesktop: "(min-width: 701px)" },
          (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };
            const cards = gsap.utils.toArray<HTMLElement>(".phase-card");

            if (isMobile) {
              // Sticky stacking is a desktop scroll effect; on phones the
              // cards are in normal flow (see .phase-card rules in
              // globals.css), so a plain fade-in is enough here.
              cards.forEach((card) => {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 24 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 88%" },
                  }
                );
              });
              return;
            }

            cards.forEach((card, i) => {
              const bgnum = card.querySelector(".phase-bgnum");
              const content = card.querySelector(".phase-content");
              const next = cards[i + 1];

              gsap.to(bgnum, {
                yPercent: -14,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });

              gsap.fromTo(
                content,
                { opacity: 0, x: -40 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "top 45%",
                    scrub: 0.5,
                  },
                }
              );

              if (next) {
                // Subtle anticipatory shrink only — no opacity change, so the
                // (fully opaque, explicitly higher z-index in CSS) next card
                // cleanly occludes this one with no ghosting.
                gsap.to(card, {
                  scale: 0.97,
                  ease: "none",
                  scrollTrigger: {
                    trigger: next,
                    start: "top 85%",
                    end: "top 15%",
                    scrub: true,
                  },
                });
              }
            });
          }
        );

        ScrollTrigger.refresh();
      }, trackRef);

      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      document.fonts?.ready?.then(refresh);
      onLoad = refresh;
      window.addEventListener("load", onLoad);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      if (onLoad) window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section className="pad-lg" id="phases">
      <div className="wrap phases-intro fade-up">
        <p className="eyebrow">The program</p>
        <h2>Your journey, three steps</h2>
      </div>

      <div className="wrap">
        <div className="phases-track" ref={trackRef}>
          {phases.map((phase) => (
            <div className="phase-card" data-step={phase.step} key={phase.step}>
              <span className="phase-bgnum">{phase.numLabel}</span>
              <div className="phase-content">
                <div className="phase-progress">
                  <span className="count">{phase.progressLabel}</span>
                  <span className="track">
                    <i style={{ width: phase.progressWidth }} />
                  </span>
                </div>
                <span className="tag">{`Phase ${phase.numLabel}`}</span>
                <span className="weeks">{phase.weeks}</span>
                <h2>{phase.title}</h2>
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

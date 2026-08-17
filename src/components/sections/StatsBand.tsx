"use client";

import { useEffect, useRef } from "react";
import { statsBand } from "@/lib/content";

type GsapCtx = { revert: () => void };

export default function StatsBand() {
  const rootRef = useRef<HTMLDivElement>(null);

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
        // fromTo() sets its own starting opacity/position in JS instead of
        // depending on a CSS `.fade-up { opacity: 0 }` rule. That CSS-only
        // approach is what left these stats permanently invisible whenever
        // the animation didn't get a chance to run: the content's *default*
        // state is now fully visible, and JS only adds the reveal on top —
        // progressive enhancement instead of a hard dependency on JS.
        gsap.utils.toArray<HTMLElement>(".stat").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });

        document
          .querySelectorAll<HTMLElement>(".stat .num[data-count]")
          .forEach((el) => {
            const target = parseFloat(el.dataset.count ?? "0");
            ScrollTrigger.create({
              trigger: el,
              start: "top 90%",
              once: true,
              onEnter: () => {
                gsap.fromTo(
                  el,
                  { textContent: 0 },
                  {
                    textContent: target,
                    duration: 1.6,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    onUpdate() {
                      el.textContent = String(
                        Math.round(Number(this.targets()[0].textContent))
                      );
                    },
                  }
                );
              },
            });
          });

        ScrollTrigger.refresh();
      }, rootRef);

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
    <div className="stats-band" ref={rootRef}>
      <div className="wrap stats-grid">
        {statsBand.map((stat) => (
          <div className="stat fade-up" key={stat.label}>
            {stat.count !== undefined ? (
              <span className="num" data-count={stat.count}>
                0
              </span>
            ) : (
              <span className="num">{stat.value}</span>
            )}
            <span className="lbl">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

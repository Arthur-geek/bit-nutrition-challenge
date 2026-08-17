"use client";

import { useEffect } from "react";

type GsapCtx = { revert: () => void };

/**
 * Mounted once in the root layout. Wires up the GSAP ScrollTrigger reveals
 * that are shared across many sections (.fade-up / .reveal-left /
 * .reveal-right, the why-card icon drift, and the proof image parallax) so
 * individual sections don't each need their own ScrollTrigger instance.
 *
 * Sections with genuinely bespoke scroll behaviour (Hero's video parallax,
 * Phases' sticky-stacking cards, StatsBand's count-up) keep their own
 * useEffect instead — see those components.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    let cancelled = false;
    let ctx: GsapCtx | undefined;
    let onLoad: (() => void) | undefined;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // A plain, one-off check is all this needs — it only picks a smaller
      // travel distance for the reveal on small screens, it doesn't gate
      // whether the reveal runs at all. The previous version wrapped this
      // whole block in gsap.matchMedia() purely for that, which added a
      // second layer of conditional setup for no real benefit — and was
      // the prime suspect for the reveals silently not firing on wider
      // viewports.
      const isMobile = window.innerWidth <= 700;

      ctx = gsap.context(() => {
        // fromTo() carries its own starting opacity/position instead of
        // relying on a CSS rule that forces opacity:0 by default, so
        // content stays visible even if this effect never runs.
        document.querySelectorAll<HTMLElement>(".fade-up").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            }
          );
        });

        const leftDistance = isMobile ? -24 : -56;
        document.querySelectorAll<HTMLElement>(".reveal-left").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: leftDistance },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            }
          );
        });

        const rightDistance = isMobile ? 24 : 56;
        document.querySelectorAll<HTMLElement>(".reveal-right").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: rightDistance },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            }
          );
        });

        document.querySelectorAll<HTMLElement>(".why-card").forEach((card, i) => {
          const icon = card.querySelector(".ico");
          gsap.to(icon, {
            yPercent: isMobile
              ? i % 2 === 0
                ? -8
                : -5
              : i % 2 === 0
              ? -18
              : -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        const proofImg = document.getElementById("proofImg");
        if (proofImg) {
          gsap.to(proofImg, {
            yPercent: isMobile ? -6 : -14,
            ease: "none",
            scrollTrigger: {
              trigger: ".proof",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // ScrollTrigger measures trigger positions as soon as the tweens
      // above are created. If a web font swaps in (next/font) or an image
      // finishes loading (next/image) afterwards, the page can reflow and
      // those measurements go stale — triggers then fire at the wrong
      // scroll position, or effectively never, which is the classic way
      // this kind of reveal "only works on mobile" (a much taller page
      // papers over slightly-wrong trigger math) but stays static on a
      // shorter desktop layout. Refreshing again once things settle fixes
      // the measurements for good.
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

  return null;
}

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { heroMeta } from "@/lib/content";

// Minimal structural type for the gsap.context() return value. We avoid
// `import type { Context } from "gsap"` because gsap does not actually
// export a top-level `Context` type — it only exists as `gsap.Context`
// inside the library's own namespace, so that import silently fails type
// resolution (red squiggle in the editor) even though nothing breaks at
// runtime. This local type is all we ever use: `ctx.revert()`.
type GsapCtx = { revert: () => void };

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // React 18 Strict Mode mounts every effect twice in dev. Because the
    // gsap import below is async, the *first* mount's cleanup can run
    // before its import has even resolved — so `ctx` would still be
    // `undefined` and `ctx?.revert()` would silently do nothing, leaving
    // that first, orphaned gsap.context() to finish setting up animations
    // on elements a *second* context is *also* about to animate. Two
    // competing tweens on the same properties is exactly what produced the
    // "text stuck invisible" bug. The `cancelled` flag below closes that
    // race: if cleanup already ran by the time the import resolves, we
    // simply never create the context in the first place.
    let cancelled = false;
    let ctx: GsapCtx | undefined;
    let onLoad: (() => void) | undefined;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(".hero h1 .line span", {
          y: "0%",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.3,
        });

        // gsap.fromTo() with an explicit "to" is used instead of gsap.from()
        // on purpose: .from() infers its end target from the element's
        // *current* computed style, which is exactly what made the previous
        // version fragile under Strict Mode's double effect. fromTo()'s end
        // state is hard-coded, so it can never be corrupted that way.
        gsap.fromTo(
          ".hero-badge, .hero p.lede, .hero-ctas, .hero-meta",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.5,
          }
        );

        gsap.fromTo(
          videoRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 2.4, ease: "power2.out" }
        );

        const mm = gsap.matchMedia();
        mm.add({ isMobile: "(max-width: 700px)" }, (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          gsap.to(videoRef.current, {
            yPercent: isMobile ? 8 : 18,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // Layout can still shift slightly after this runs (next/font swap,
        // next/image finishing a late load) — refreshing once guards
        // ScrollTrigger against measuring stale positions.
        ScrollTrigger.refresh();
      });

      // Extra safety net: web font swaps (next/font) and late-loading
      // images (next/image) can reflow the page after the measurements
      // above were taken, leaving ScrollTrigger with stale trigger
      // positions. Refreshing again once things settle avoids that.
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
    <section className="hero" id="top">
      <video ref={videoRef} autoPlay muted loop playsInline poster="/assets/clbs.jpg">
        <source src="/assets/dji_compressed.mp4" type="video/mp4" />
      </video>

      <div className="wrap hero-inner">
        <div className="hero-badge">
          <span className="dot" />
          Healthcare Innovation &amp; Nutrition Design Challenge
        </div>

        <h1>
          <span className="line">
            <span>Nutrition.</span>
          </span>
          <span className="line">
            <span className="accent">Innovation.</span>
          </span>
          <span className="line">
            <span>Real Impact.</span>
          </span>
        </h1>

        <p className="lede">
          A national challenge inviting BIT students to design real
          solutions for Burkina Faso&apos;s health and nutrition needs.
          Guided curriculum, hands on mentorship, and a stage to show what
          you built.
        </p>

        <div className="hero-ctas">
          <Link href="#apply" className="btn btn-primary">
            Join the cohort
          </Link>
          <Link href="#phases" className="btn btn-ghost">
            See the program
          </Link>
        </div>

        <div className="hero-meta">
          {heroMeta.map((item) => (
            <div key={item.label}>
              <span className="num">{item.value}</span>
              <span className="lbl">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

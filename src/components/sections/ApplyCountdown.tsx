"use client";

import { useEffect, useState } from "react";
import { applyFormUrl } from "@/lib/content";

// Burkina Faso runs on UTC+0 year round (no DST), so this ISO string with
// an explicit +00:00 offset always means the same real moment regardless
// of where the visitor's browser is.
const DEADLINE = new Date("2026-08-31T23:59:59+00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(DEADLINE - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ApplyCountdown() {
  // Starts as null on purpose: the very first render (server AND client)

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const tick = () => {
      if (Date.now() >= DEADLINE) {
        setClosed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft(getTimeLeft());
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (closed) {
    return (
      <div className="apply-cta-card reveal-right">
        <p className="eyebrow">Applications closed</p>
        <h4>Registrations are closed</h4>
        <p>
          Thanks for your interest. Applications for this cohort are no
          longer open. Keep an eye out for the next one.
        </p>
        <span className="closed-badge">Closed</span>
      </div>
    );
  }

  return (
    <div className="apply-cta-card reveal-right">
      <p className="eyebrow">Applications close in</p>

      <div className="countdown" aria-live="polite">
        <div className="countdown-unit">
          <span className="countdown-num">{timeLeft ? pad(timeLeft.days) : "--"}</span>
          <span className="countdown-lbl">Days</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-num">{timeLeft ? pad(timeLeft.hours) : "--"}</span>
          <span className="countdown-lbl">Hours</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-num">{timeLeft ? pad(timeLeft.minutes) : "--"}</span>
          <span className="countdown-lbl">Min</span>
        </div>
        <div className="countdown-unit">
          <span className="countdown-num">{timeLeft ? pad(timeLeft.seconds) : "--"}</span>
          <span className="countdown-lbl">Sec</span>
        </div>
      </div>

      <h4>Open the application form</h4>
      <p>
        You&apos;ll be asked for your name, BIT email, program, year of
        study, and a couple of sentences on the nutrition problem you want
        to solve.
      </p>
      <a
        href={applyFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Open application form ↗
      </a>
      <span className="apply-cta-note">
        Applications close August 31 at 23:59 · Opens in Google Forms
      </span>
    </div>
  );
}

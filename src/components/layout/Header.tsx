"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { applyFormUrl, navLinks } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <Link href="#top" className="logo-mark">
        <Image
          src="/assets/logo-bit.png"
          alt="Burkina Institute of Technology"
          width={52}
          height={30}
          style={{ width: "auto", height: "30px" }}
          priority
        />
      </Link>

      <nav className="links">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link href={applyFormUrl} className="btn btn-primary">
        Apply
      </Link>
    </header>
  );
}

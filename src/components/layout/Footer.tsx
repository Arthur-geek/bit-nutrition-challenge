import Image from "next/image";
import { footerLinks } from "@/lib/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src="/assets/logo-bit.png"
              alt="BIT"
              width={38}
              height={22}
              style={{ width: "auto", height: "22px" }}
            />
            <p>
              Burkina Institute of Technology. Healthcare Innovation &amp;
              Nutrition Design Challenge, backed by Project Prana Foundation.
            </p>
          </div>

          <div className="footer-links">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <span>{group.title}</span>
                {group.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Burkina Institute of Technology</span>
          <span>Project Prana Foundation · Cambridge, MA · 501(c)(3)</span>
        </div>
      </div>
    </footer>
  );
}

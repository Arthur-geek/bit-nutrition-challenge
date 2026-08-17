import { partners } from "@/lib/content";

export default function Partners() {
  return (
    <section className="pad-lg" id="partners">
      <div className="wrap">
        <div className="section-head fade-up">
          <p className="eyebrow">Backed by</p>
          <h2>Who&apos;s got your back</h2>
        </div>

        <div className="partners-grid">
          {partners.map((partner, i) => (
            <div
              className={`partner-card ${i === 0 ? "reveal-left" : "reveal-right"}`}
              key={partner.name}
            >
              <p className="eyebrow">{partner.name}</p>
              <h4 style={{ fontSize: "1.25rem", marginTop: "var(--s8)" }}>
                {partner.subtitle}
              </h4>
              <ul>
                {partner.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ip-strip fade-up">
          <h4>It stays yours</h4>
          <p>
            Every idea and prototype belongs to you, the student innovator.
            We only ever share the results and impact of the symposium,
            nothing else.
          </p>
        </div>
      </div>
    </section>
  );
}

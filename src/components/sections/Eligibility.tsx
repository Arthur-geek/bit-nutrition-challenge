import { eligibility } from "@/lib/content";

export default function Eligibility() {
  return (
    <section className="pad-lg" id="eligibility">
      <div className="wrap">
        <div className="section-head fade-up">
          <p className="eyebrow">Eligibility</p>
          <h2>Is this for you?</h2>
        </div>

        <div className="elig-grid">
          <ul className="elig-list reveal-left">
            {eligibility.criteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="not-required-card reveal-right">
            <p className="eyebrow">You do not need</p>
            <ul>
              {eligibility.notRequired.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

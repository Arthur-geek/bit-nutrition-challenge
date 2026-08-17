const whyCards = [
  {
    title: "Mentors who've built it before",
    text: "Get paired with mentors who have designed real healthcare technology, not just given advice about it.",
    path: "M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5",
  },
  {
    title: "A curriculum built for you",
    text: "Learn at your own pace, with a class dedicated to how health systems actually work in Burkina Faso.",
    path: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z",
  },
  {
    title: "A stage to show your work",
    text: "Pitch your solution at the final symposium and walk away with a certificate that proves you built something real.",
    path: "M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z",
  },
  {
    title: "Your idea stays yours",
    text: "Every innovation and project idea belongs to the students who create it, fully and without exception.",
    path: "M12 3 3 8v8l9 5 9-5V8l-9-5Z",
  },
];

export default function WhyApply() {
  return (
    <section className="pad-lg" id="why">
      <div className="wrap">
        <div className="section-head fade-up">
          <p className="eyebrow">Why apply</p>
          <h2>What the cohort gives you</h2>
        </div>

        <div className="why-grid">
          {whyCards.map((card, i) => (
            <div
              className={`why-card ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
              key={card.title}
            >
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                  <path d={card.path} />
                </svg>
              </div>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

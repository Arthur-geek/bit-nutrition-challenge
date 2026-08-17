import Image from "next/image";

export default function Challenge() {
  return (
    <section className="pad-lg" id="defi">
      <div className="wrap split">
        <div className="reveal-left">
          <p className="eyebrow">The challenge</p>
          <h2>Healthcare Innovation &amp; Nutrition Design Challenge</h2>
          <p className="lede" style={{ marginTop: "var(--s20)" }}>
            This is not a theoretical case study. You will tackle a real
            nutrition or health problem affecting communities in Burkina
            Faso today, one that people are living with right now.
          </p>
          <p style={{ marginTop: "var(--s16)" }}>
            Pick a challenge from a shortlist of real, community rooted
            problems and design a solution people can actually use. Your
            mentors will push you to think bigger and build smarter.
          </p>
        </div>

        <div className="img-frame reveal-right">
          <Image
            src="/assets/csprogram.jpg"
            alt="BIT student working on her innovation project"
            width={900}
            height={1100}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}

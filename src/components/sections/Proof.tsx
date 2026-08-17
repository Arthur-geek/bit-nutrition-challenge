import Image from "next/image";

export default function Proof() {
  return (
    <div className="proof">
      <div className="proof-img-wrap">
        <Image
          id="proofImg"
          src="/assets/clbs.jpg"
          alt="BIT students building a robotics prototype"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="proof-caption fade-up">
        <p className="eyebrow">Already in motion</p>
        <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)" }}>
          Your future teammates are already building.
        </h2>
      </div>
    </div>
  );
}

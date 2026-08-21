import ApplyCountdown from "./ApplyCountdown";

export default function Apply() {
  return (
    <section className="apply pad-lg" id="apply">
      <div className="wrap apply-grid">
        <div className="apply-side reveal-left">
          <p className="eyebrow">Application</p>
          <h2>Ready to apply?</h2>
          <p>
            It takes about five minutes. No essays, no stress, just tell us
            who you are and what you want to build.
          </p>
          <div className="mini">
            <div>
              <strong>No fees.</strong> Applying costs you nothing, ever.
            </div>
            <div>
              <strong>Real review.</strong> Every application gets read, not
              just scanned.
            </div>
            <div>
              <strong>Fast reply.</strong> You will hear back soon after
              applications close.
            </div>
          </div>
        </div>

        <ApplyCountdown />
      </div>
    </section>
  );
}
import { applyFormUrl } from "@/lib/content";

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

        <div className="apply-cta-card reveal-right">
          <p className="eyebrow">Ready when you are</p>
          <h4>Open the application form</h4>
          <p>
            You&apos;ll be asked for your name, BIT email, program, year of
            study, and a couple of sentences on the nutrition problem you
            want to solve.
          </p>
          <a
            href={applyFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open application form ↗
          </a>
          <span className="apply-cta-note">Opens in Google Forms · ~5 minutes</span>
        </div>
      </div>
    </section>
  );
}

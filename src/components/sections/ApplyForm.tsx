"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="apply pad-lg" id="apply">
      <div className="wrap apply-grid">
        <div className="apply-side reveal-left">
          <p className="eyebrow">Application</p>
          <h2>Apply to the cohort</h2>
          <p>
            Applications are managed directly by BIT. Complete this form to
            be considered for the 4-week enrollment window.
          </p>
          <div className="mini">
            <div>
              <strong>No fees</strong> — the application is completely free.
            </div>
            <div>
              <strong>Selection</strong> — BIT shortlist, PPF confirmation.
            </div>
            <div>
              <strong>Kickoff</strong> — right after the scoping period ends.
            </div>
          </div>
        </div>

        <form className="reg-form reveal-right" onSubmit={handleSubmit}>
          <div className="row2">
            <div className="field">
              <label htmlFor="fname">Full name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                required
                placeholder="e.g. Aïcha Ouédraogo"
              />
            </div>
            <div className="field">
              <label htmlFor="femail">BIT email</label>
              <input
                type="email"
                id="femail"
                name="femail"
                required
                placeholder="firstname.lastname@bit.edu.bf"
              />
            </div>
          </div>

          <div className="row2">
            <div className="field">
              <label htmlFor="ffiliere">Program / Major</label>
              <input
                type="text"
                id="ffiliere"
                name="ffiliere"
                required
                placeholder="e.g. Computer Engineering"
              />
            </div>
            <div className="field">
              <label htmlFor="fyear">Year of study</label>
              <select id="fyear" name="fyear" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option>Master 1</option>
                <option>Master 2</option>
                <option>PhD</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="fphone">Phone number</label>
            <input
              type="tel"
              id="fphone"
              name="fphone"
              required
              placeholder="+226 XX XX XX XX"
            />
          </div>

          <div className="field">
            <label htmlFor="fmotiv">
              What nutrition problem do you want to solve?
            </label>
            <textarea
              id="fmotiv"
              name="fmotiv"
              required
              placeholder="Two or three sentences are enough."
            />
          </div>

          <label className="consent">
            <input type="checkbox" required />
            <span>
              I confirm I&apos;m available for the self-paced curriculum and
              live mentorship for the full duration of the program.
            </span>
          </label>

          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Submit my application"}
          </button>

          {status === "sent" && (
            <p className="form-msg show">
              Thanks! Your application has been received — a BIT coordinator
              will reach out by email.
            </p>
          )}
          {status === "error" && (
            <p className="form-msg show" style={{ color: "#c1512f" }}>
              Something went wrong — please try again or email
              programme@bit.edu.bf directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

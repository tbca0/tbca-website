"use client";

import { useState } from "react";

export function JoinForm() {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <section className="section join-strip" id="join" aria-labelledby="join-title">
      <div className="container join-inner">
        <div className="join-copy">
          <h2 id="join-title" className="section-title">
            Join TBCA
          </h2>
          <p>
            Membership and volunteering keep our events affordable and welcoming. Share your skills—stage,
            sound, design, food safety, youth coaching—or simply show up as a participant.
          </p>
          <ul className="checklist">
            <li>Family-friendly events across Telangana</li>
            <li>Transparent, volunteer-led organizing</li>
            <li>Open to anyone who respects Bengali culture</li>
          </ul>
        </div>
        <form
          className="join-form"
          id="interest-form"
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus("");
            setIsError(false);

            const form = e.currentTarget;
            if (!form.checkValidity()) {
              form.reportValidity();
              return;
            }

            const fd = new FormData(form);
            const payload = {
              name: String(fd.get("name") ?? ""),
              email: String(fd.get("email") ?? ""),
              interest: String(fd.get("interest") ?? ""),
              message: String(fd.get("message") ?? ""),
            };

            setPending(true);
            try {
              const res = await fetch("/api/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              const data = (await res.json().catch(() => ({}))) as {
                ok?: boolean;
                error?: string;
              };

              if (!res.ok || !data.ok) {
                setIsError(true);
                setStatus(data.error || "Something went wrong. Please try again or email info@tbca.in.");
                return;
              }

              setStatus("Thank you! Your interest has been recorded. We’ll reach out soon.");
              form.reset();
            } catch {
              setIsError(true);
              setStatus("Network error. Please try again or email info@tbca.in.");
            } finally {
              setPending(false);
            }
          }}
        >
          <label className="field">
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required placeholder="Your full name" />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
          <label className="field">
            <span>I am interested in</span>
            <select name="interest" required defaultValue="">
              <option value="">Choose one</option>
              <option>Membership</option>
              <option>Volunteering</option>
              <option>Sponsorship</option>
              <option>Cultural collaboration</option>
            </select>
          </label>
          <label className="field">
            <span>Message (optional)</span>
            <textarea name="message" rows={3} placeholder="Tell us how you’d like to help" />
          </label>
          <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
            {pending ? "Sending…" : "Submit interest"}
          </button>
          <p
            className={`form-note${isError ? " form-note--error" : ""}`}
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}

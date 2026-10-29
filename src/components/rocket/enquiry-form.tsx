import { useState, type FormEvent } from "react";

import { branches, services } from "./data";

type Kind = "wash" | "franchise";

/** Set VITE_ENQUIRY_WEBHOOK_URL in .env (GoHighLevel, Make.com or Zapier inbound webhook). */
const WEBHOOK_URL = (import.meta.env.VITE_ENQUIRY_WEBHOOK_URL as string | undefined) ?? "";

async function submitEnquiry({ data }: { data: Record<string, string | undefined> }) {
  if (!WEBHOOK_URL) {
    return { ok: false as const, message: "Online requests are not connected yet. Please call your nearest branch." };
  }
  const reference = `RCW-${Date.now().toString(36).toUpperCase().slice(-5)}`;
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, reference, source: "rocket-website", submittedAt: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error(String(response.status));
  return { ok: true as const, reference };
}
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "done"; reference: string; type: Kind };

export function EnquiryForm() {
  const [type, setType] = useState<Kind>("wash");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const read = (key: string) => String(form.get(key) ?? "").trim();
    const fullName = read("fullName");
    const phone = read("phone");
    if (fullName.length < 2 || phone.replace(/\D/g, "").length < 10) {
      setStatus({ kind: "error", message: "Add your name and a 10 digit mobile number, then send again." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const result = await submitEnquiry({
        data: {
          kind: type,
          fullName,
          phone,
          branch: read("branch") || undefined,
          service: read("service") || undefined,
          city: read("city") || undefined,
          preferredDate: read("preferredDate") || undefined,
          note: read("note") || undefined,
        },
      });
      if (result.ok) setStatus({ kind: "done", reference: result.reference, type });
      else setStatus({ kind: "error", message: result.message });
    } catch {
      setStatus({ kind: "error", message: "That did not go through. Check your connection and try again." });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="rk-form rk-glass rk-done" role="status">
        <span className="rk-eyebrow">Request received</span>
        <strong>{status.reference}</strong>
        <p>
          {status.type === "wash"
            ? "Your branch will call to confirm the slot. Keep this reference handy when you arrive."
            : "The Rocket franchise team will call you to talk through territory, investment and timelines."}
        </p>
      </div>
    );
  }

  return (
    <form className="rk-form rk-glass" onSubmit={onSubmit} noValidate data-rk-reveal="">
      <div className="rk-tabs" role="group" aria-label="Request type">
        <button type="button" aria-pressed={type === "wash"} onClick={() => setType("wash")}>Book a wash</button>
        <button type="button" aria-pressed={type === "franchise"} onClick={() => setType("franchise")}>Franchise enquiry</button>
      </div>
      <div className="rk-form__grid">
        <div className="rk-field">
          <label htmlFor="rk-name">Your name</label>
          <input id="rk-name" name="fullName" autoComplete="name" placeholder="Karthik S" required />
        </div>
        <div className="rk-field">
          <label htmlFor="rk-phone">Mobile number</label>
          <input id="rk-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" required />
        </div>
        {type === "wash" ? (
          <>
            <div className="rk-field">
              <label htmlFor="rk-branch">Branch</label>
              <select id="rk-branch" name="branch" defaultValue={branches[0]?.name}>
                {branches.map((b) => (
                  <option key={b.name} value={b.name}>{`${b.name}, ${b.area}`}</option>
                ))}
              </select>
            </div>
            <div className="rk-field">
              <label htmlFor="rk-service">Service</label>
              <select id="rk-service" name="service" defaultValue={services[0].name}>
                {services.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="rk-field rk-field--wide">
              <label htmlFor="rk-date">Preferred date</label>
              <input id="rk-date" name="preferredDate" type="date" />
            </div>
          </>
        ) : (
          <>
            <div className="rk-field rk-field--wide">
              <label htmlFor="rk-city">City you want to open in</label>
              <input id="rk-city" name="city" autoComplete="address-level2" placeholder="Madurai" />
            </div>
            <div className="rk-field rk-field--wide">
              <label htmlFor="rk-note">Anything we should know</label>
              <textarea id="rk-note" name="note" placeholder="Site available, timeline, current business" />
            </div>
          </>
        )}
      </div>
      {status.kind === "error" ? <p className="rk-form__msg" role="alert">{status.message}</p> : null}
      <button className="rk-submit" type="submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending" : type === "wash" ? "Request my slot" : "Send enquiry"}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

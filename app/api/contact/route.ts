import { NextResponse } from "next/server";

/*
 * POST /api/contact
 * ──────────────────
 * Handles contact form submissions and forwards them as email via
 * Formsubmit.co to the studio inbox (STUDIO_EMAIL below).
 *
 * Important: Formsubmit requires an Origin/Referer header and checks
 * the response body (not just HTTP status) for success.
 *
 * First-time activation: on the FIRST submission ever, Formsubmit
 * sends an activation link to STUDIO_EMAIL. Open the inbox (and the
 * SPAM folder), click the "Activate Form" link, then future submissions
 * arrive directly. Until that link is clicked, no emails are delivered.
 */

const STUDIO_EMAIL = "darshuug32@gmail.com";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();

  // Server-side validation
  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please share your name." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please share a valid email." },
      { status: 400 }
    );
  }
  if (!phone || phone.length < 6) {
    return NextResponse.json(
      { ok: false, error: "Please share a phone number." },
      { status: 400 }
    );
  }

  // Derive the request origin so Formsubmit trusts us.
  const origin =
    request.headers.get("origin") ??
    request.headers.get("referer") ??
    "http://localhost:3000";

  // Forward to Formsubmit.co — delivers to STUDIO_EMAIL
  try {
    const fsRes = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(STUDIO_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: origin,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          _subject: `New Enquiry from ${name} — KATHA Studio`,
          _template: "table",
          _captcha: "false",
          _replyto: email,
        }),
      }
    );

    const body = (await fsRes.json().catch(() => ({}))) as {
      success?: string | boolean;
      message?: string;
    };

    // Formsubmit returns HTTP 200 for several error cases — we have to
    // inspect the body. Activation step: body.success === "false" AND
    // the message mentions "Activation".
    const success = body.success === true || body.success === "true";
    const needsActivation =
      !success && typeof body.message === "string" && /activat/i.test(body.message);

    if (needsActivation) {
      // Tell the caller we've kicked off activation. The form-sender
      // still sees a friendly success — the studio will activate once
      // and then all subsequent submissions flow through.
      return NextResponse.json(
        {
          ok: true,
          activation: true,
          message:
            "Your enquiry was received. The studio inbox is being set up — the next one will arrive instantly.",
        },
        { status: 200 }
      );
    }

    if (!success) {
      console.error("[contact] Formsubmit rejected", fsRes.status, body);
      return NextResponse.json(
        {
          ok: false,
          error:
            body.message ??
            "We couldn't deliver your message right now. Please try again or email us directly.",
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] forwarding failure", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Network error reaching our inbox. Please try again.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

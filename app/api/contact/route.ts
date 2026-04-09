import { NextResponse } from "next/server";
import { Resend } from "resend";
import { StudioEnquiryNotification } from "@/emails/studio-enquiry-notification";
import { VisitorAutoresponse } from "@/emails/visitor-autoresponse";

/*
 * POST /api/contact
 * ──────────────────
 * Sends two emails via Resend whenever the contact form is submitted:
 *
 *   1. Studio notification  →  STUDIO_EMAIL
 *      (editorial dispatch layout — see emails/studio-enquiry-notification.tsx)
 *
 *   2. Visitor autoresponse  →  the sender
 *      (warm personal confirmation — see emails/visitor-autoresponse.tsx)
 *
 * Required env vars:
 *   RESEND_API_KEY    — obtain at https://resend.com (free tier: 100/day)
 *   RESEND_FROM       — verified sender, e.g. "KATHA Studio <hello@kathastudio.co>"
 *                       During development, use Resend's onboarding@resend.dev
 *                       which only delivers to the account owner.
 *
 * Optional:
 *   STUDIO_EMAIL      — defaults to neha@kathastudio.co
 */

const STUDIO_EMAIL = process.env.STUDIO_EMAIL ?? "neha@kathastudio.co";
const RESEND_FROM =
  process.env.RESEND_FROM ?? "KATHA Studio <onboarding@resend.dev>";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatSubmittedAt(d: Date): string {
  // "Thu · 09 Apr 2026 · 14:32 IST"
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  })
    .format(d)
    .replace(/, /g, " · ");
}

function buildDispatchId(d: Date): string {
  // "KS·240409·1432"  — YY MM DD · HH MM
  const pad = (n: number) => String(n).padStart(2, "0");
  const yy = pad(d.getFullYear() % 100);
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `KS·${yy}${mm}${dd}·${hh}${mi}`;
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

  // Required env
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured. Please email us directly at neha@kathastudio.co.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const now = new Date();
  const submittedAt = formatSubmittedAt(now);
  const dispatchId = buildDispatchId(now);
  const firstName = name.split(/\s+/)[0];
  const sourceUrl =
    request.headers.get("referer") ??
    request.headers.get("origin") ??
    "—";

  try {
    // 1. Studio notification  ─────────────────────────────────────────
    const studio = await resend.emails.send({
      from: RESEND_FROM,
      to: [STUDIO_EMAIL],
      replyTo: email,
      subject: `◆ New enquiry — ${name} · KATHA Studio`,
      react: StudioEnquiryNotification({
        name,
        email,
        phone,
        submittedAt,
        sourceUrl,
        dispatchId,
      }),
    });

    if (studio.error) {
      console.error("[contact] studio email failed", studio.error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't deliver your message right now. Please try again or email us directly.",
        },
        { status: 502 }
      );
    }

    // 2. Visitor autoresponse  ────────────────────────────────────────
    // Failure here is non-fatal — the studio already has the lead.
    const visitor = await resend.emails.send({
      from: RESEND_FROM,
      to: [email],
      replyTo: STUDIO_EMAIL,
      subject: `Thank you for writing to KATHA Studio`,
      react: VisitorAutoresponse({
        firstName,
        submittedAt,
      }),
    });

    if (visitor.error) {
      console.warn("[contact] autoresponse failed (non-fatal)", visitor.error);
    }
  } catch (err) {
    console.error("[contact] Resend exception", err);
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

import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

/**
 * Studio-facing notification email.
 *
 * Aesthetic: editorial dispatch — a printed telegram from the website.
 * Cream paper canvas, deep ink, a rule grid, Playfair display set in
 * uppercase with tight tracking, Inter for the data, numbered index
 * in the corner like a magazine masthead.
 *
 * Designed to be instantly scannable: the studio should know who,
 * when, how to reply, and how to call — all in one glance.
 */
export type StudioEnquiryNotificationProps = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  submittedAt: string; // preformatted, e.g. "Thu · 09 Apr 2026 · 14:32 IST"
  sourceUrl: string;
  dispatchId: string; // short stable identifier, e.g. "KS·240409·1432"
};

const PAPER = "#f5f1e8";
const PAPER_RULE = "#1a1a1a0f";
const INK = "#111111";
const INK_MUTED = "#5c5650";
const INK_DIM = "#8a847c";
const ACCENT = "#b8451f"; // burnt vermillion — editorial red

const fontBody = `'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif`;
const fontDisplay = `'Playfair Display', 'Didot', 'Bodoni 72', Georgia, serif`;
const fontMono = `'JetBrains Mono', 'SF Mono', 'Menlo', monospace`;

export function StudioEnquiryNotification({
  name = "Anonymous",
  email = "—",
  phone = "—",
  message = "",
  submittedAt = "—",
  sourceUrl = "—",
  dispatchId = "KS·000000·0000",
}: StudioEnquiryNotificationProps) {
  const firstName = name.split(/\s+/)[0];
  const mailtoReply = `mailto:${email}?subject=${encodeURIComponent(
    `Re: Your enquiry to KATHA Studio`
  )}&body=${encodeURIComponent(`Hi ${firstName},\n\n`)}`;
  const telDirect = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <Html>
      <Head />
      <Preview>
        New enquiry from {name} — {submittedAt}
      </Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: PAPER,
          fontFamily: fontBody,
          color: INK,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "48px 40px 56px",
            backgroundColor: PAPER,
          }}
        >
          {/* ── Masthead ── */}
          <Section>
            <Row>
              <Column style={{ verticalAlign: "top" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: fontBody,
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: INK,
                  }}
                >
                  Katha&nbsp;·&nbsp;Studio
                </Text>
                <Text
                  style={{
                    margin: "2px 0 0 0",
                    fontFamily: fontBody,
                    fontSize: "9px",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: INK_DIM,
                  }}
                >
                  Incoming Dispatch
                </Text>
              </Column>
              <Column style={{ textAlign: "right", verticalAlign: "top" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: fontMono,
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    color: INK_DIM,
                  }}
                >
                  № {dispatchId}
                </Text>
                <Text
                  style={{
                    margin: "2px 0 0 0",
                    fontFamily: fontMono,
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    color: INK_DIM,
                  }}
                >
                  {submittedAt}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Heavy rule ── */}
          <Hr
            style={{
              border: "none",
              borderTop: `2px solid ${INK}`,
              margin: "20px 0 0 0",
            }}
          />
          <Hr
            style={{
              border: "none",
              borderTop: `1px solid ${INK}`,
              margin: "3px 0 40px 0",
            }}
          />

          {/* ── Kicker ── */}
          <Text
            style={{
              margin: 0,
              fontFamily: fontBody,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            ◆ &nbsp;New Enquiry
          </Text>

          {/* ── Headline ── */}
          <Text
            style={{
              margin: "14px 0 0 0",
              fontFamily: fontDisplay,
              fontSize: "42px",
              fontWeight: 700,
              lineHeight: "1.05",
              letterSpacing: "-0.01em",
              color: INK,
            }}
          >
            A new conversation
            <br />
            from <em style={{ fontStyle: "italic" }}>{firstName}</em>.
          </Text>

          {/* ── Standfirst ── */}
          <Text
            style={{
              margin: "22px 0 0 0",
              maxWidth: "520px",
              fontFamily: fontDisplay,
              fontSize: "16px",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: "1.55",
              color: INK_MUTED,
            }}
          >
            Someone reached out through the studio site. Their details are
            below — reply within two working days to honour the promise on
            the contact page.
          </Text>

          {/* ── Thin rule ── */}
          <Hr
            style={{
              border: "none",
              borderTop: `1px solid ${PAPER_RULE}`,
              margin: "36px 0 28px 0",
            }}
          />

          {/* ── Data ledger ── */}
          <Section>
            <LedgerRow label="Full name" value={name} />
            <LedgerRow label="Email"     value={email} href={`mailto:${email}`} />
            <LedgerRow label="Phone"     value={phone} href={telDirect} />
            <LedgerRow label="Received"  value={submittedAt} muted />
            <LedgerRow label="Source"    value={sourceUrl} href={sourceUrl} muted truncate />
          </Section>

          {/* ── Message block ── */}
          {message && (
            <>
              <Hr
                style={{
                  border: "none",
                  borderTop: `1px solid ${PAPER_RULE}`,
                  margin: "32px 0 24px 0",
                }}
              />
              <Text
                style={{
                  margin: "0 0 12px 0",
                  fontFamily: fontBody,
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: INK_DIM,
                }}
              >
                Message
              </Text>
              <Text
                style={{
                  margin: 0,
                  fontFamily: fontDisplay,
                  fontSize: "16px",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: "1.65",
                  color: INK,
                  whiteSpace: "pre-wrap",
                }}
              >
                “{message}”
              </Text>
            </>
          )}

          {/* ── Thin rule ── */}
          <Hr
            style={{
              border: "none",
              borderTop: `1px solid ${PAPER_RULE}`,
              margin: "32px 0 32px 0",
            }}
          />

          {/* ── Action buttons ── */}
          <Section>
            <Row>
              <Column style={{ width: "50%", paddingRight: "6px" }}>
                <Link
                  href={mailtoReply}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "16px 20px",
                    backgroundColor: INK,
                    color: PAPER,
                    fontFamily: fontBody,
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    border: `1px solid ${INK}`,
                  }}
                >
                  Reply by email →
                </Link>
              </Column>
              <Column style={{ width: "50%", paddingLeft: "6px" }}>
                <Link
                  href={telDirect}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "16px 20px",
                    backgroundColor: PAPER,
                    color: INK,
                    fontFamily: fontBody,
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    border: `1px solid ${INK}`,
                  }}
                >
                  Call direct ↗
                </Link>
              </Column>
            </Row>
          </Section>

          {/* ── Footer rule ── */}
          <Hr
            style={{
              border: "none",
              borderTop: `1px solid ${INK}`,
              margin: "56px 0 3px 0",
            }}
          />
          <Hr
            style={{
              border: "none",
              borderTop: `2px solid ${INK}`,
              margin: 0,
            }}
          />

          {/* ── Colophon ── */}
          <Section style={{ marginTop: "18px" }}>
            <Row>
              <Column style={{ verticalAlign: "top" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: fontBody,
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: INK_DIM,
                  }}
                >
                  Studio · Bengaluru
                </Text>
              </Column>
              <Column style={{ textAlign: "right", verticalAlign: "top" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: fontBody,
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: INK_DIM,
                  }}
                >
                  kathastudio.co
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default StudioEnquiryNotification;

/* ── Reusable ledger row for the data block ── */
function LedgerRow({
  label,
  value,
  href,
  muted = false,
  truncate = false,
}: {
  label: string;
  value: string;
  href?: string;
  muted?: boolean;
  truncate?: boolean;
}) {
  const valueStyle: React.CSSProperties = {
    margin: 0,
    fontFamily: fontBody,
    fontSize: muted ? "13px" : "15px",
    fontWeight: muted ? 400 : 500,
    color: muted ? INK_MUTED : INK,
    textDecoration: "none",
    ...(truncate && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap" as const,
    }),
  };

  return (
    <Row style={{ marginBottom: "18px" }}>
      <Column style={{ width: "130px", verticalAlign: "top" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: fontBody,
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: INK_DIM,
            paddingTop: "3px",
          }}
        >
          {label}
        </Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        {href ? (
          <Link href={href} style={{ ...valueStyle, borderBottom: `1px solid ${PAPER_RULE}` }}>
            {value}
          </Link>
        ) : (
          <Text style={valueStyle}>{value}</Text>
        )}
      </Column>
    </Row>
  );
}

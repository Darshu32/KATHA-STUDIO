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
 * Visitor-facing autoresponder.
 *
 * Aesthetic: a personal note from the studio. Cream paper, refined
 * serif display, generous line-height, hand-written feel. Not a
 * transactional receipt — a warm acknowledgement.
 *
 * Deliberately asymmetric: wide margins on the right for breathing
 * room, an oversized dropped-initial on the greeting, and an italic
 * sign-off that feels signed by hand.
 */
export type VisitorAutoresponseProps = {
  firstName: string;
  submittedAt: string;
};

const PAPER = "#f5f1e8";
const PAPER_DEEP = "#ece5d3";
const PAPER_RULE = "#1a1a1a0f";
const INK = "#111111";
const INK_MUTED = "#5c5650";
const INK_DIM = "#8a847c";
const ACCENT = "#b8451f";

const fontBody = `'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif`;
const fontDisplay = `'Playfair Display', 'Didot', 'Bodoni 72', Georgia, serif`;

export function VisitorAutoresponse({
  firstName = "there",
  submittedAt = "just now",
}: VisitorAutoresponseProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for writing to KATHA Studio — we&apos;ve received your note.
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
            maxWidth: "580px",
            margin: "0 auto",
            padding: "56px 44px 64px",
            backgroundColor: PAPER,
          }}
        >
          {/* ── Wordmark ── */}
          <Section>
            <Text
              style={{
                margin: 0,
                fontFamily: fontBody,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: INK,
                textAlign: "center",
              }}
            >
              K · A · T · H · A
            </Text>
            <Text
              style={{
                margin: "4px 0 0 0",
                fontFamily: fontBody,
                fontSize: "8px",
                fontWeight: 400,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: INK_DIM,
                textAlign: "center",
              }}
            >
              Studio · Est. Bengaluru
            </Text>
          </Section>

          {/* ── Rule ornament ── */}
          <Section style={{ marginTop: "36px", textAlign: "center" }}>
            <Text
              style={{
                margin: 0,
                fontFamily: fontDisplay,
                fontSize: "14px",
                color: ACCENT,
                letterSpacing: "0.6em",
              }}
            >
              ✦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✦
            </Text>
          </Section>

          {/* ── Headline ── */}
          <Text
            style={{
              margin: "36px 0 0 0",
              fontFamily: fontDisplay,
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "1.02",
              letterSpacing: "-0.015em",
              textAlign: "center",
              color: INK,
            }}
          >
            Thank you,
            <br />
            <em style={{ fontStyle: "italic", color: ACCENT }}>{firstName}</em>.
          </Text>

          {/* ── Kicker line under headline ── */}
          <Section style={{ marginTop: "28px", textAlign: "center" }}>
            <Text
              style={{
                margin: "0 auto",
                display: "inline-block",
                fontFamily: fontBody,
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: INK_DIM,
                borderTop: `1px solid ${INK}`,
                borderBottom: `1px solid ${INK}`,
                padding: "8px 20px",
              }}
            >
              Your note has arrived
            </Text>
          </Section>

          {/* ── Body ── */}
          <Text
            style={{
              margin: "44px 0 0 0",
              fontFamily: fontDisplay,
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "1.7",
              color: INK,
            }}
          >
            We received your enquiry on{" "}
            <span style={{ fontStyle: "italic", color: INK_MUTED }}>
              {submittedAt}
            </span>
            , and it is already on the desk of someone who will read it
            carefully. You can expect a personal reply within{" "}
            <span style={{ fontWeight: 700 }}>two working days</span> — often
            sooner.
          </Text>

          <Text
            style={{
              margin: "22px 0 0 0",
              fontFamily: fontDisplay,
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "1.7",
              color: INK,
            }}
          >
            At KATHA, every conversation begins the same way: slowly, with
            attention. We look forward to learning about the story you are
            trying to tell, and to seeing whether we might be the right hands
            to help you tell it.
          </Text>

          {/* ── Signature block ── */}
          <Section style={{ marginTop: "48px" }}>
            <Text
              style={{
                margin: 0,
                fontFamily: fontDisplay,
                fontSize: "16px",
                fontStyle: "italic",
                fontWeight: 400,
                color: INK_MUTED,
                lineHeight: "1.5",
              }}
            >
              With warmth,
            </Text>
            <Text
              style={{
                margin: "4px 0 0 0",
                fontFamily: fontDisplay,
                fontSize: "26px",
                fontStyle: "italic",
                fontWeight: 700,
                color: INK,
                lineHeight: "1.2",
              }}
            >
              The KATHA Studio Team
            </Text>
          </Section>

          {/* ── Divider card ── */}
          <Section
            style={{
              marginTop: "52px",
              padding: "24px 28px",
              backgroundColor: PAPER_DEEP,
              border: `1px solid ${PAPER_RULE}`,
            }}
          >
            <Text
              style={{
                margin: 0,
                fontFamily: fontBody,
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: INK_DIM,
              }}
            >
              In the meantime
            </Text>
            <Text
              style={{
                margin: "10px 0 0 0",
                fontFamily: fontDisplay,
                fontSize: "15px",
                fontStyle: "italic",
                lineHeight: "1.6",
                color: INK,
              }}
            >
              If something urgent comes up, simply reply to this email — it
              routes straight to the studio. Or explore our recent work at{" "}
              <Link
                href="https://kathastudio.co"
                style={{
                  color: ACCENT,
                  textDecoration: "none",
                  borderBottom: `1px solid ${ACCENT}`,
                }}
              >
                kathastudio.co
              </Link>
              .
            </Text>
          </Section>

          {/* ── Colophon ── */}
          <Hr
            style={{
              border: "none",
              borderTop: `1px solid ${PAPER_RULE}`,
              margin: "56px 0 20px 0",
            }}
          />
          <Section>
            <Row>
              <Column style={{ verticalAlign: "top" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: fontBody,
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: INK_DIM,
                  }}
                >
                  neha@kathastudio.co
                </Text>
              </Column>
              <Column style={{ textAlign: "right", verticalAlign: "top" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: fontBody,
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: INK_DIM,
                  }}
                >
                  Bengaluru · India
                </Text>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              margin: "24px 0 0 0",
              fontFamily: fontBody,
              fontSize: "8px",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: INK_DIM,
              textAlign: "center",
            }}
          >
            This is an automated confirmation. A human reply will follow.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default VisitorAutoresponse;

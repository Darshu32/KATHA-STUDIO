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
 * Studio-facing notification email — plain and scannable.
 * White paper, system sans, no ornaments.
 */
export type StudioEnquiryNotificationProps = {
  name: string;
  email: string;
  phone: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  message?: string;
  submittedAt: string;
  sourceUrl: string;
  dispatchId: string;
};

const TEXT = "#111111";
const TEXT_MUTED = "#666666";
const RULE = "#e6e6e6";

const fontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;

export function StudioEnquiryNotification({
  name = "Anonymous",
  email = "—",
  phone = "—",
  projectType = "",
  budgetRange = "",
  timeline = "",
  message = "",
  submittedAt = "—",
  sourceUrl = "—",
}: StudioEnquiryNotificationProps) {
  const mailtoReply = `mailto:${email}?subject=${encodeURIComponent(
    "Re: Your enquiry to KATHA STUDIO"
  )}`;

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
          backgroundColor: "#ffffff",
          fontFamily: fontStack,
          color: TEXT,
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "40px 32px 40px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Wordmark */}
          <Text
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: TEXT,
            }}
          >
            KATHA STUDIO
          </Text>

          {/* Heading */}
          <Text
            style={{
              margin: "28px 0 0 0",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1.35,
              color: TEXT,
            }}
          >
            New enquiry from {name}
          </Text>

          <Text
            style={{
              margin: "6px 0 28px 0",
              fontSize: "13px",
              color: TEXT_MUTED,
            }}
          >
            Received {submittedAt}
          </Text>

          {/* Divider */}
          <Hr style={{ border: "none", borderTop: `1px solid ${RULE}`, margin: "0 0 24px 0" }} />

          {/* Contact details */}
          <Field label="Name" value={name} />
          <Field label="Email" value={email} href={`mailto:${email}`} />
          <Field label="Phone" value={phone} href={`tel:${phone.replace(/\s+/g, "")}`} />
          {projectType && <Field label="Project" value={projectType} />}
          {budgetRange && <Field label="Budget" value={budgetRange} />}
          {timeline && <Field label="Timeline" value={timeline} />}
          {sourceUrl !== "—" && <Field label="Source" value={sourceUrl} href={sourceUrl} />}

          {/* Message */}
          {message && (
            <>
              <Hr style={{ border: "none", borderTop: `1px solid ${RULE}`, margin: "24px 0 20px 0" }} />
              <Text
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: TEXT_MUTED,
                }}
              >
                Message
              </Text>
              <Text
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: TEXT,
                  whiteSpace: "pre-wrap",
                }}
              >
                {message}
              </Text>
            </>
          )}

          {/* Reply button */}
          <Section style={{ marginTop: "32px" }}>
            <Link
              href={mailtoReply}
              style={{
                display: "inline-block",
                padding: "12px 22px",
                backgroundColor: TEXT,
                color: "#ffffff",
                fontFamily: fontStack,
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                borderRadius: "2px",
              }}
            >
              Reply to {name}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default StudioEnquiryNotification;

function Field({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <Row style={{ marginBottom: "12px" }}>
      <Column style={{ width: "90px", verticalAlign: "top" }}>
        <Text
          style={{
            margin: 0,
            fontSize: "12px",
            fontWeight: 500,
            color: TEXT_MUTED,
            paddingTop: "1px",
          }}
        >
          {label}
        </Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        {href ? (
          <Link
            href={href}
            style={{
              margin: 0,
              fontSize: "14px",
              color: TEXT,
              textDecoration: "underline",
              textDecorationColor: RULE,
            }}
          >
            {value}
          </Link>
        ) : (
          <Text
            style={{
              margin: 0,
              fontSize: "14px",
              color: TEXT,
            }}
          >
            {value}
          </Text>
        )}
      </Column>
    </Row>
  );
}

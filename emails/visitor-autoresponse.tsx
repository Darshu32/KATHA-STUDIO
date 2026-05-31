import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

/**
 * Visitor-facing autoresponder — plain and friendly.
 * White paper, system sans, no ornaments.
 */
export type VisitorAutoresponseProps = {
  firstName: string;
  submittedAt: string;
};

const TEXT = "#111111";

const fontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;

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

          {/* Greeting */}
          <Text
            style={{
              margin: "28px 0 0 0",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1.35,
              color: TEXT,
            }}
          >
            Hi {firstName},
          </Text>

          {/* Body */}
          <Text
            style={{
              margin: "20px 0 0 0",
              fontSize: "15px",
              lineHeight: 1.65,
              color: TEXT,
            }}
          >
            Thanks for writing. We received your note on {submittedAt} and will
            reply within two working days.
          </Text>

          <Text
            style={{
              margin: "16px 0 0 0",
              fontSize: "15px",
              lineHeight: 1.65,
              color: TEXT,
            }}
          >
            If anything is urgent, just reply to this email — it routes
            straight to the studio.
          </Text>

          {/* Sign-off */}
          <Text
            style={{
              margin: "32px 0 0 0",
              fontSize: "15px",
              lineHeight: 1.65,
              color: TEXT,
            }}
          >
            — The KATHA Studio team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default VisitorAutoresponse;

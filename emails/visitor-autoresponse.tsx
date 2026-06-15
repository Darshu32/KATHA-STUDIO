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
 * Visitor-facing autoresponder — calm editorial serif on soft paper.
 * Sent to anyone who submits the contact form.
 */

const PAPER = "#f7f6f2";
const INK = "#1a1a1a";
const INK_DIM = "#6f6c66";
const SERIF = `Georgia, "Times New Roman", Times, serif`;

const para: React.CSSProperties = {
  margin: "28px 0 0 0",
  fontFamily: SERIF,
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: 1.6,
  color: INK,
};

export function VisitorAutoresponse({ name = "" }: { name?: string }) {
  const firstName = name.trim().split(/\s+/)[0] || "there";

  return (
    <Html>
      <Head />
      <Preview>
        Every message we receive is the beginning of something important to us.
      </Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: PAPER,
          fontFamily: SERIF,
          color: INK,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "48px 40px 52px",
            backgroundColor: PAPER,
          }}
        >
          {/* Wordmark */}
          <Text
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontSize: "19px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: INK,
            }}
          >
            KATHA STUDIO
          </Text>

          {/* Greeting */}
          <Text style={para}>Hi {firstName},</Text>

          {/* Body */}
          <Text style={{ ...para, marginTop: "10px" }}>
            Every message we receive is the beginning of something important to
            us.
          </Text>

          <Text style={para}>
            We will be in touch within two working days.
          </Text>

          {/* Sign-off */}
          <Text style={{ ...para, marginTop: "40px" }}>— Neha</Text>

          <Text
            style={{
              margin: "6px 0 0 0",
              fontFamily: SERIF,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: INK_DIM,
            }}
          >
            Founder | Katha Studio
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default VisitorAutoresponse;

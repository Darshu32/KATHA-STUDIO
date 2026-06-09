import { getAdjacentNav } from "@/lib/nav-order";
import { AboutView } from "@/components/about-view";

export const metadata = {
  title: "Studio — KATHA Studio",
  description: "Katha means story. A founder-led practice shaped by listening, context, and craftsmanship.",
};

export default function AboutPage() {
  const { prev, next } = getAdjacentNav("/about");
  return <AboutView prev={prev} next={next} />;
}

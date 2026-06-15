import { getAdjacentNav } from "@/lib/nav-order";
import { AboutView } from "@/components/about-view";

export const metadata = {
  title: "Studio — KATHA Studio",
  description: "Katha means story. A founder-led practice shaped by listening, context, and craftsmanship.",
};

export default function StudioPage() {
  const { prev, next } = getAdjacentNav("/studio");
  return <AboutView prev={prev} next={next} />;
}

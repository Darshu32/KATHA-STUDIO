import { getAdjacentNav } from "@/lib/nav-order";
import { AboutView } from "@/components/about-view";

export const metadata = {
  title: "About — KATHA Studio",
  description: "Architecture and interiors shaped through proportion, restraint, and material calm.",
};

export default function AboutPage() {
  const { prev, next } = getAdjacentNav("/about");
  return <AboutView prev={prev} next={next} />;
}

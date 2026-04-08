import { getAdjacentNav } from "@/lib/nav-order";
import { ContactView } from "@/components/contact-view";

export const metadata = {
  title: "Contact — KATHA Studio",
  description: "Begin with a clear architectural conversation.",
};

export default function ContactPage() {
  const { prev, next } = getAdjacentNav("/contact");
  return <ContactView prev={prev} next={next} />;
}

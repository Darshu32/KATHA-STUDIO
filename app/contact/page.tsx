import { getAdjacentNav } from "@/lib/nav-order";
import { ContactView } from "@/components/contact-view";

export const metadata = {
  title: "Contact — KATHA Studio",
  description: "Begin with a clear architectural conversation.",
};

export default function ContactPage() {
  // Contact is the last page in the global chain, so its natural "previous"
  // would be the last service (High-Rise). Point it Home instead.
  const { next } = getAdjacentNav("/contact");
  return <ContactView prev={{ href: "/", label: "Home" }} next={next} />;
}

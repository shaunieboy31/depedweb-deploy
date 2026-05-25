import { ContactService } from "@/services/contact.service";
import ContactPage from "./ContactPage";

export default async function Page() {
  const contactInfo = await ContactService.getInfo();
  return <ContactPage contactInfo={contactInfo} />;
}

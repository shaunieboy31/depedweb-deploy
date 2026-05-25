"use server";

import { revalidatePath } from "next/cache";
import { ContactService, ContactData } from "@/services/contact.service";

export async function getContactInfoAction() {
  try {
    const info = await ContactService.getInfo();
    return { success: true, data: info };
  } catch (error) {
    console.error("Failed to fetch contact info:", error);
    return { success: false, error: "Database fetch failed" };
  }
}

export async function updateContactInfoAction(formData: FormData) {
  try {
    const contactData: ContactData = {
      location: formData.get("location") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      officeHours: formData.get("officeHours") as string,
      facebook: formData.get("facebook") as string,
      twitter: formData.get("twitter") as string,
      youtube: formData.get("youtube") as string,
      website: formData.get("website") as string,
    };

    await ContactService.updateInfo(contactData);

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/services/online");
    revalidatePath("/schools/directory");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to update contact info:", error);
    return { success: false, error: "Database update failed" };
  }
}

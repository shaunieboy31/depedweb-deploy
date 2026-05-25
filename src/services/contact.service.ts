import prisma from "@/lib/prisma";

export type ContactData = {
  location: string;
  phone: string;
  email: string;
  officeHours: string;
  facebook?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  website?: string | null;
};

export class ContactService {
  static async getInfo() {
    const info = await prisma.contactInfo.findFirst();
    if (!info) {
      // Default placeholder if none exists
      return {
        id: 0,
        location: "Toclong I-C, Imus City, Cavite, 4103",
        phone: "(046) 419-8450 local 204 or 227",
        email: "sgod.imus@deped.gov.ph",
        officeHours: "Mon - Fri: 8:00 AM - 5:00 PM",
        facebook: "",
        twitter: "",
        youtube: "",
        website: "",
      };
    }
    return info;
  }

  static async updateInfo(data: ContactData) {
    const existing = await prisma.contactInfo.findFirst();
    if (existing) {
      return await prisma.contactInfo.update({
        where: { id: existing.id },
        data,
      });
    } else {
      return await prisma.contactInfo.create({
        data,
      });
    }
  }
}

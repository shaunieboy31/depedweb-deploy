"use server";

import { revalidatePath } from "next/cache";
import { SchoolService, SchoolData } from "@/services/school.service";
import { FileService } from "@/services/file.service";

export async function getSchoolsAction() {
  try {
    const data = await SchoolService.getAll();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch schools:", error);
    return { success: false, error: "Database fetch failed" };
  }
}

export async function getSchoolStatsAction() {
  try {
    const data = await SchoolService.getSchoolStats();
    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch school stats:", error);
    return { success: false, error: "Database fetch failed" };
  }
}

export async function getSchoolsByCategoryAction(category: string) {
  try {
    // In a real scenario we might add getByCategory to the service, 
    // but for now we filter the getAll or just use the same logic
    const schools = await SchoolService.getAll();
    const filtered = schools.filter(s => s.category === category.toUpperCase());
    return { success: true, data: filtered };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSchoolAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const cluster = formData.get("cluster") as string;
    const contact = formData.get("contact") as string;
    const type = formData.get("type") as string;

    const logoFile = formData.get("logo") as File | null;
    const bannerFile = formData.get("banner") as File | null;
    const oldLogoPath = formData.get("oldLogoPath") as string;
    const oldBannerPath = formData.get("oldBannerPath") as string;

    let logoUrl = oldLogoPath;
    let bannerUrl = oldBannerPath;

    // Handle Media Uploads via centralized FileService
    if (logoFile && logoFile.size > 0 && typeof logoFile !== "string") {
      logoUrl = await FileService.upload(logoFile);
    }
    if (bannerFile && bannerFile.size > 0 && typeof bannerFile !== "string") {
      bannerUrl = await FileService.upload(bannerFile);
    }

    const data: SchoolData = {
      name,
      location,
      category,
      cluster,
      contact,
      type,
      logo: logoUrl || null,
      banner: bannerUrl || null,
    };

    if (id) {
      await SchoolService.update(parseInt(id), data);
    } else {
      await SchoolService.create(data);
    }

    revalidatePath("/");
    revalidatePath("/schools");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Update School Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteSchoolAction(id: number) {
  try {
    await SchoolService.delete(id);
    revalidatePath("/");
    revalidatePath("/schools");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

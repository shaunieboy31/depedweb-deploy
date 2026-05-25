"use server";

import { revalidatePath } from "next/cache";
import { OrgChartService, OrgChartData } from "@/services/org-chart.service";
import { FileService } from "@/services/file.service";

/**
 * Fetch all Org Charts sorted by sortOrder
 */
export async function getOrgChartsAction() {
  try {
    const charts = await OrgChartService.getAll();
    return { success: true, data: charts };
  } catch (error) {
    console.error("Error fetching org charts:", error);
    return { success: false, error: "Failed to fetch organizational charts." };
  }
}

/**
 * Create or Update an Org Chart
 */
export async function updateOrgChartAction(formData: FormData) {
  try {
    const id = formData.get("id") ? parseInt(formData.get("id") as string) : null;
    const department = formData.get("department") as string;
    const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;
    const imageFile = formData.get("image") as File;
    const oldImagePath = formData.get("oldImagePath") as string;

    let imagePath = oldImagePath || null;

    // Handle Image Upload via centralized FileService
    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
      imagePath = await FileService.upload(imageFile);
    }

    const orgData: OrgChartData = { department, image: imagePath, sortOrder };

    if (id) {
      await OrgChartService.update(id, orgData);
    } else {
      await OrgChartService.create(orgData);
    }

    revalidatePath("/about-us/organizational-structure");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error saving org chart:", error);
    return { success: false, error: "Failed to save organizational chart." };
  }
}

/**
 * Delete an Org Chart
 */
export async function deleteOrgChartAction(id: number) {
  try {
    await OrgChartService.delete(id);

    revalidatePath("/about-us/organizational-structure");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting org chart:", error);
    return { success: false, error: "Failed to delete organizational chart." };
  }
}

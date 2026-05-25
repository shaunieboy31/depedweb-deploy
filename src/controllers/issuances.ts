"use server";

import { revalidatePath } from "next/cache";
import { IssuanceService, IssuanceData } from "@/services/issuance.service";
import { FileService } from "@/services/file.service";

export async function getIssuancesAction(category?: string, type?: string) {
  try {
    const issuances = await IssuanceService.getAll({ category, type });
    return { success: true, data: issuances };
  } catch (error) {
    console.error("Failed to fetch issuances:", error);
    return { success: false, error: "Failed to fetch issuances" };
  }
}

export async function updateIssuanceAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const number = formData.get("number") as string;
    const type = formData.get("type") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const year = formData.get("year") as string;
    const docFile = formData.get("file") as File | null;
    const oldFileUrl = formData.get("oldFileUrl") as string;

    let fileUrl = oldFileUrl;

    // Handle document upload if a new file is provided
    if (docFile && docFile.size > 0 && typeof docFile !== "string") {
      fileUrl = await FileService.upload(docFile);
    }

    const idStr = formData.get("id") as string;
    const updateId = idStr ? parseInt(idStr) : NaN;
    const issuanceData: IssuanceData = {
      title,
      number,
      type,
      category,
      date,
      year,
      fileUrl,
    };

    if (isNaN(updateId)) {
      await IssuanceService.create(issuanceData);
    } else {
      await IssuanceService.update(updateId, issuanceData);
    }

    revalidatePath("/issuances");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update issuance:", error);
    return { success: false, error: error.message || "Database update failed" };
  }
}

export async function deleteIssuanceAction(id: number) {
  try {
    await IssuanceService.delete(id);
    
    revalidatePath("/issuances");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete issuance:", error);
    return { success: false, error: "Failed to delete issuance" };
  }
}

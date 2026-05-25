"use server";

import { revalidatePath } from "next/cache";
import { LeaderService, LeaderData } from "@/services/leader.service";
import { FileService } from "@/services/file.service";

export async function getLeadersAction() {
  try {
    const leaders = await LeaderService.getAll();
    // Return sanitized data
    return { success: true, data: JSON.parse(JSON.stringify(leaders)) };
  } catch (error) {
    console.error("Failed to fetch leaders:", error);
    return { success: false, error: "Failed to fetch leaders" };
  }
}

export async function updateLeaderAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const startYear = formData.get("startYear") as string;
    const endYear = formData.get("endYear") as string;
    const imageFile = formData.get("image") as File | null;
    const oldImagePath = formData.get("oldImagePath") as string;

    let imagePath = oldImagePath;

    // Handle image upload if a new file is provided
    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
      imagePath = await FileService.upload(imageFile);
    }

    const idStr = formData.get("id") as string;
    const updateId = idStr ? parseInt(idStr) : NaN;
    const leaderData: LeaderData = {
      name,
      position,
      startYear,
      endYear,
      image: imagePath,
    };

    if (isNaN(updateId)) {
      await LeaderService.create(leaderData);
    } else {
      await LeaderService.update(updateId, leaderData);
    }

    revalidatePath("/about-us/learning-leaders");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update leader:", error);
    return { success: false, error: "Database update failed" };
  }
}

export async function deleteLeaderAction(id: number) {
  try {
    await LeaderService.delete(id);
    
    revalidatePath("/about-us/learning-leaders");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete leader:", error);
    return { success: false, error: "Failed to delete leader" };
  }
}

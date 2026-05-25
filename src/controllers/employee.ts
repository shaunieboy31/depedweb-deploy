"use server";

import { revalidatePath } from "next/cache";
import { EmployeeService, HonorData } from "@/services/employee.service";
import { FileService } from "@/services/file.service";

export async function getEmployeeHonorsAction() {
  try {
    const honors = await EmployeeService.getHonors();
    return { success: true, data: honors };
  } catch (error) {
    console.error("Failed to fetch employee honors:", error);
    return { success: false, error: "Database fetch failed" };
  }
}

export async function updateEmployeeHonorAction(formData: FormData) {
  try {
    const id = formData.get("id") ? parseInt(formData.get("id") as string) : null;
    const month = formData.get("month") as string;
    const year = formData.get("year") as string;
    const imageFile = formData.get("image") as File;
    const oldImagePath = formData.get("oldImagePath") as string;

    let imagePath = oldImagePath || null;

    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
      imagePath = await FileService.upload(imageFile);
    }

    const honorData: HonorData = { month, year, image: imagePath };

    if (id) {
      await EmployeeService.updateHonor(id, honorData);
    } else {
      await EmployeeService.createHonor(honorData);
    }

    revalidatePath("/");
    revalidatePath("/about-us/employee-of-month");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to update employee honor:", error);
    return { success: false, error: "Database update failed" };
  }
}

export async function deleteEmployeeHonorAction(id: number) {
  try {
    await EmployeeService.deleteHonor(id);
    
    revalidatePath("/");
    revalidatePath("/about-us/employee-of-month");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete employee honor:", error);
    return { success: false, error: "Deletion failed" };
  }
}

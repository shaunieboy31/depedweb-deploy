"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { transparencyItemSchema } from "@/validators/transparency";

export async function getTransparencyItemsAction() {
  try {
    const items = await prisma.transparencySeal.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' }
      ]
    });
    return { success: true, data: items };
  } catch (error) {
    console.error("Error fetching transparency items:", error);
    return { success: false, error: "Failed to fetch items" };
  }
}

export async function updateTransparencyItemAction(formData: FormData) {
  try {
    const rawData = {
      id: formData.get("id") as string,
      category: formData.get("category") as string,
      title: formData.get("title") as string,
      url: formData.get("url") as string,
      isExternal: formData.get("isExternal") === "true",
      year: formData.get("year") as string || null,
      order: parseInt(formData.get("order") as string || "0"),
    };

    // Validate with Zod
    const validatedData = transparencyItemSchema.parse(rawData);

    if (validatedData.id && validatedData.id !== "new") {
      await prisma.transparencySeal.update({
        where: { id: parseInt(validatedData.id) },
        data: { 
          category: validatedData.category, 
          title: validatedData.title, 
          url: validatedData.url, 
          isExternal: validatedData.isExternal, 
          year: validatedData.year, 
          order: validatedData.order 
        }
      });
    } else {
      await prisma.transparencySeal.create({
        data: { 
          category: validatedData.category, 
          title: validatedData.title, 
          url: validatedData.url, 
          isExternal: validatedData.isExternal, 
          year: validatedData.year, 
          order: validatedData.order 
        }
      });
    }

    revalidatePath("/transparency-seal");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
       return { success: false, error: "Validation failed: " + error.message };
    }
    console.error("Error saving transparency item:", error);
    return { success: false, error: "Failed to save item" };
  }
}

export async function deleteTransparencyItemAction(id: number) {
  try {
    await prisma.transparencySeal.delete({
      where: { id }
    });
    revalidatePath("/transparency-seal");
    return { success: true };
  } catch (error) {
    console.error("Error deleting transparency item:", error);
    return { success: false, error: "Failed to delete item" };
  }
}

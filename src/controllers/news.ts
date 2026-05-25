"use server";

import { revalidatePath } from "next/cache";
import { NewsService, NewsData } from "@/services/news.service";
import { FileService } from "@/services/file.service";

export async function getNewsAction() {
  try {
    const news = await NewsService.getAll();
    return { success: true, data: news };
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return { success: false, error: "Failed to fetch news" };
  }
}

export async function updateNewsAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;
    const oldImagePath = formData.get("oldImagePath") as string;

    let imagePath = oldImagePath;

    // Handle image upload if a new file is provided
    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
      imagePath = await FileService.upload(imageFile);
    }

    const updateId = parseInt(formData.get("id") as string);
    const newsData: NewsData = { title, excerpt, date, category, image: imagePath };

    if (isNaN(updateId)) {
      await NewsService.create(newsData);
    } else {
      await NewsService.update(updateId, newsData);
    }

    revalidatePath("/");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update news:", error);
    return { success: false, error: "Database update failed" };
  }
}

export async function deleteNewsAction(id: number) {
  try {
    await NewsService.delete(id);
    
    revalidatePath("/");
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete news:", error);
    return { success: false, error: "Failed to delete news" };
  }
}

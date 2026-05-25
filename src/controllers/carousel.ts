"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function getCarouselSlidesAction() {
  try {
    const slides = await prisma.carouselSlide.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: slides };
  } catch (error) {
    console.error("Failed to fetch carousel slides:", error);
    return { success: false, error: "Database fetch failed" };
  }
}

export async function createCarouselSlideAction(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return { success: false, error: "No image provided" };
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Save image locally
    const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const imagePath = `/uploads/${filename}`;

    // Create the slide entry
    await prisma.carouselSlide.create({
      data: {
        image: imagePath,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to create carousel slide:", error);
    return { success: false, error: "Failed to upload slide" };
  }
}

export async function deleteCarouselSlideAction(id: number) {
  try {
    const slide = await prisma.carouselSlide.findUnique({ where: { id } });
    
    // Optional: Delete physical file if you want
    // if (slide?.image) {
    //   const filePath = path.join(process.cwd(), "public", slide.image);
    //   await fs.unlink(filePath).catch(() => {});
    // }

    await prisma.carouselSlide.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete carousel slide:", error);
    return { success: false, error: "Failed to delete slide" };
  }
}

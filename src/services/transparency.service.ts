import { prisma } from "@/lib/prisma";

export async function getTransparencySealItems() {
  try {
    const items = await prisma.transparencySeal.findMany({
      orderBy: {
        order: 'asc'
      }
    });
    return { success: true, data: items };
  } catch (error) {
    console.error("Error fetching transparency seal items:", error);
    return { success: false, error: "Failed to fetch transparency seal items" };
  }
}

import prisma from "@/lib/prisma";

export type IssuanceData = {
  title: string;
  number: string;
  type: string;
  category: string;
  date: string;
  year?: string | null;
  fileUrl?: string | null;
};

export class IssuanceService {
  /**
   * Retrieves issuances with optional filters.
   */
  static async getAll(filters: { category?: string; type?: string } = {}) {
    const where: any = {};
    if (filters.category) where.category = filters.category;
    if (filters.type) where.type = filters.type;

    return await prisma.issuance.findMany({
      where,
      orderBy: [
        { year: "desc" },
        { number: "desc" },
        { createdAt: "desc" },
      ],
    });
  }

  /**
   * Creates a new issuance record.
   */
  static async create(data: IssuanceData) {
    return await prisma.issuance.create({
      data,
    });
  }

  /**
   * Updates an existing issuance record.
   */
  static async update(id: number, data: Partial<IssuanceData>) {
    return await prisma.issuance.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes an issuance record.
   */
  static async delete(id: number) {
    return await prisma.issuance.delete({
      where: { id },
    });
  }
}

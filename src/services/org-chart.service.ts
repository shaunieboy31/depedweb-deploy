import prisma from "@/lib/prisma";

export type OrgChartData = {
  department: string;
  sortOrder: number;
  image?: string | null;
};

export class OrgChartService {
  static async getAll() {
    return await prisma.orgChart.findMany({
      orderBy: { sortOrder: "asc" },
    });
  }

  static async create(data: OrgChartData) {
    return await prisma.orgChart.create({
      data,
    });
  }

  static async update(id: number, data: Partial<OrgChartData>) {
    return await prisma.orgChart.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return await prisma.orgChart.delete({
      where: { id },
    });
  }
}

import prisma from "@/lib/prisma";

export type SchoolData = {
  name: string;
  location: string;
  category: string;
  type: string;
  cluster?: string | null;
  contact?: string | null;
  logo?: string | null;
  banner?: string | null;
};

export class SchoolService {
  static async getAll() {
    return await prisma.school.findMany({
      orderBy: { name: "asc" },
    });
  }

  static async getSchoolStats() {
    const allSchools = await prisma.school.findMany();
    
    return {
      total: allSchools.length,
      public: allSchools.filter(s => s.type === "PUBLIC").length,
      private: allSchools.filter(s => s.type === "PRIVATE").length,
      elementary: allSchools.filter(s => s.category.toUpperCase() === "ELEMENTARY").length,
      juniorHigh: allSchools.filter(s => s.category.toUpperCase() === "JHS").length,
      seniorHigh: allSchools.filter(s => s.category.toUpperCase() === "SHS").length,
      integrated: allSchools.filter(s => s.category.toUpperCase() === "INTEGRATED").length,
    };
  }

  static async getById(id: number) {
    return await prisma.school.findUnique({
      where: { id },
    });
  }

  static async create(data: SchoolData) {
    return await prisma.school.create({
      data,
    });
  }

  static async update(id: number, data: Partial<SchoolData>) {
    return await prisma.school.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return await prisma.school.delete({
      where: { id },
    });
  }
}

import prisma from "@/lib/prisma";

export type HonorData = {
  month: string;
  year: string;
  image?: string | null;
};

export class EmployeeService {
  static async getHonors() {
    return await prisma.employeeHonor.findMany({
      orderBy: [
        { year: "desc" },
        { createdAt: "desc" }
      ],
    });
  }

  static async createHonor(data: HonorData) {
    return await prisma.employeeHonor.create({
      data,
    });
  }

  static async updateHonor(id: number, data: Partial<HonorData>) {
    return await prisma.employeeHonor.update({
      where: { id },
      data,
    });
  }

  static async deleteHonor(id: number) {
    return await prisma.employeeHonor.delete({
      where: { id },
    });
  }
}

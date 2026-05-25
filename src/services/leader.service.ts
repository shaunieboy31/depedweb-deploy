import prisma from "@/lib/prisma";

export type LeaderData = {
  name: string;
  position: string;
  image?: string | null;
  startYear?: string | null;
  endYear?: string | null;
};

export class LeaderService {
  static async getAll() {
    return await prisma.leader.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  static async create(data: LeaderData) {
    return await prisma.leader.create({
      data,
    });
  }

  static async update(id: number, data: Partial<LeaderData>) {
    return await prisma.leader.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return await prisma.leader.delete({
      where: { id },
    });
  }
}

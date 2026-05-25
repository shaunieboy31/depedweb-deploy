import prisma from "@/lib/prisma";

export type NewsData = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string | null;
};

export class NewsService {
  /**
   * Retrieves all news articles.
   */
  static async getAll() {
    return await prisma.news.findMany({
      orderBy: { id: "asc" },
    });
  }

  /**
   * Retrieves a single news article by ID.
   */
  static async getById(id: number) {
    return await prisma.news.findUnique({
      where: { id },
    });
  }

  /**
   * Creates a new news article.
   */
  static async create(data: NewsData) {
    return await prisma.news.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        image: data.image,
      },
    });
  }

  /**
   * Updates an existing news article.
   */
  static async update(id: number, data: Partial<NewsData>) {
    return await prisma.news.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a news article.
   */
  static async delete(id: number) {
    return await prisma.news.delete({
      where: { id },
    });
  }
}

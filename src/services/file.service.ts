import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export class FileService {
  private static UPLOAD_DIR = join(process.cwd(), "public/uploads");

  /**
   * Ensures the upload directory exists.
   */
  private static async ensureDirectory() {
    try {
      await mkdir(this.UPLOAD_DIR, { recursive: true });
    } catch (e) {
      // Ignore if directory already exists
    }
  }

  /**
   * Uploads a file to the public/uploads directory.
   * @param file The File object from FormData
   * @returns The public URL of the uploaded file
   */
  static async upload(file: File): Promise<string> {
    if (!file || file.size === 0) {
      throw new Error("No file or empty file provided");
    }

    await this.ensureDirectory();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename: timestamp + sanitized name
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = join(this.UPLOAD_DIR, filename);

    await writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  }
}

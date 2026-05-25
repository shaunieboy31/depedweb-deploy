import { z } from "zod";

export const transparencyItemSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, "Category is required (e.g. 1.A)"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  url: z.string().url("Please enter a valid URL"),
  isExternal: z.boolean().default(false),
  year: z.string().nullable().optional(),
  order: z.number().int().default(0),
});

export type TransparencyItemInput = z.infer<typeof transparencyItemSchema>;

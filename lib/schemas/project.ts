import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(50, "Project name must be at most 50 characters"),
  code: z.string().max(10, "Code must be at most 10 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

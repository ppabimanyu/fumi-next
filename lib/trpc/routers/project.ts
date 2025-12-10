import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  listProjects: protectedProcedure.query(async ({ ctx }) => {
    const activeWorkspaceId = ctx.session!.session.activeWorkspaceId;

    const projects = await ctx.db.project.findMany({
      where: {
        workspaceId: activeWorkspaceId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return projects;
  }),

  createProject: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(1, "Project name is required")
          .min(2, "Project name must be at least 2 characters")
          .max(50, "Project name must be at most 50 characters"),
        code: z.string().max(10, "Code must be at most 10 characters"),
        description: z
          .string()
          .max(500, "Description must be at most 500 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workspaceId = ctx.session!.session.activeWorkspaceId;
      const { name, code, description } = input;

      // Generate code from name if not provided (first 4 chars uppercase)
      const projectCode =
        code?.toUpperCase() ||
        name
          .replace(/[^a-zA-Z]/g, "")
          .substring(0, 4)
          .toUpperCase() ||
        "PROJ";

      const project = await ctx.db.project.create({
        data: {
          name,
          code: projectCode,
          description,
          workspaceId,
        },
      });

      return { projectId: project.id };
    }),
});

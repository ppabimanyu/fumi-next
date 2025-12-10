import { createTRPCRouter, protectedProcedure } from "../init";
import { createProjectSchema } from "@/lib/schemas/project";

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
    .input(createProjectSchema)
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

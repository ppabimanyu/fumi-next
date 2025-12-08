import { createTRPCRouter, protectedProcedure } from "../init";

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
});

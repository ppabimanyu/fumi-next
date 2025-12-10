import { createTRPCRouter } from "../init";
import { projectRouter } from "./project";
import { userRouter } from "./user";
import { workspaceRouter } from "./workspace";
import { workspaceMemberRouter } from "./workspace-member";

export const appRouter = createTRPCRouter({
  user: userRouter,
  workspace: workspaceRouter,
  workspaceMember: workspaceMemberRouter,
  project: projectRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

import { createTRPCRouter } from "../init";
import { projectRouter } from "./project";
import { userRouter } from "./user";
import { workspaceRouter } from "./workspace";

export const appRouter = createTRPCRouter({
  user: userRouter,
  workspace: workspaceRouter,
  project: projectRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

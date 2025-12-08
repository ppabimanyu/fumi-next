import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { env } from "@/env";
import { sendEmail } from "./mail-sender";
import { twoFactor } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import {
  deleteAccountTemplate,
  emailVerificationTemplate,
  resetPasswordTemplate,
  successResetPasswordTemplate,
} from "./mail-template";
import {
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
  WorkspaceType,
} from "@/generated/prisma/enums";

export const auth = betterAuth({
  appName: env.NEXT_PUBLIC_APP_NAME,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: env.AUTH_REQUIRED_EMAIL_VERIFICATION,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        ...resetPasswordTemplate(url),
      });
    },
    onPasswordReset: async ({ user }) => {
      await sendEmail({
        to: user.email,
        ...successResetPasswordTemplate(),
      });
    },
  },
  session: {
    additionalFields: {
      activeWorkspaceId: {
        type: "string",
        input: true,
      },
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          ...deleteAccountTemplate(url),
        });
      },
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        ...emailVerificationTemplate(url),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [twoFactor(), nextCookies()],
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const workspace = await prisma.workspace.findFirst({
            where: {
              workspaceMembers: {
                some: {
                  userId: session.userId,
                  role: WorkspaceMemberRole.OWNER,
                  status: WorkspaceMemberStatus.ACTIVE,
                },
              },
              workspaceType: WorkspaceType.PERSONAL,
            },
          });
          return {
            data: {
              ...session,
              activeWorkspaceId: workspace?.id,
            },
          };
        },
      },
    },
    user: {
      create: {
        after: async (user) => {
          await prisma.workspace.create({
            data: {
              name: user.name.split(" ")[0] + "'s Workspace",
              description: "Default workspace for " + user.name,
              workspaceType: WorkspaceType.PERSONAL,
              workspaceMembers: {
                create: {
                  role: WorkspaceMemberRole.OWNER,
                  status: WorkspaceMemberStatus.ACTIVE,
                  userId: user.id,
                },
              },
              projects: {
                create: {
                  code: "PROJ",
                  name: "Default Project",
                  description: "Default project for " + user.name,
                  issueStatuses: {
                    createMany: {
                      data: [
                        {
                          name: "Backlog",
                          icon: "BACKLOG",
                          isCompleted: false,
                          isCanceled: false,
                        },
                        {
                          name: "To Do",
                          icon: "BACKLOG",
                          isCompleted: false,
                          isCanceled: false,
                        },
                        {
                          name: "In Progress",
                          icon: "IN_PROGRESS",
                          isCompleted: false,
                          isCanceled: false,
                        },
                        {
                          name: "Testing",
                          icon: "REVIEW",
                          isCompleted: false,
                          isCanceled: false,
                        },
                        {
                          name: "Done",
                          icon: "DONE",
                          isCompleted: true,
                          isCanceled: false,
                        },
                      ],
                    },
                  },
                },
              },
            },
          });
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;

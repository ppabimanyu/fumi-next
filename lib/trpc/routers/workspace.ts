import {
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
  WorkspaceType,
} from "@/generated/prisma/enums";
import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getStorageAdapter } from "@/lib/storage";

// Maximum file size: 800KB
const MAX_FILE_SIZE = 800 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const uploadImageSchema = z.object({
  fileBase64: z.string().min(1, "File data is required"),
  fileName: z.string().min(1, "File name is required"),
  contentType: z.string().refine((type) => ALLOWED_TYPES.includes(type), {
    message: "Invalid file type. Allowed: JPG, PNG, GIF, WebP",
  }),
});

export const workspaceRouter = createTRPCRouter({
  createWorkspace: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session!.user.id;
      const { name, description } = input;

      const workspace = await ctx.db.workspace.create({
        data: {
          name,
          workspaceType: WorkspaceType.ORGANIZATION,
          description,
          workspaceMembers: {
            create: {
              role: WorkspaceMemberRole.OWNER,
              status: WorkspaceMemberStatus.ACTIVE,
              userId,
            },
          },
          projects: {
            create: {
              code: "PROJ",
              name: "Default Project",
              description: "Default project for " + name,
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

      return { workspaceId: workspace.id };
    }),

  changeActiveWorkspace: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sessionId = ctx.session!.session.id;
      const { workspaceId } = input;

      await ctx.db.session.update({
        where: {
          id: sessionId,
        },
        data: {
          activeWorkspaceId: workspaceId,
        },
      });
    }),

  listWorkspace: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;
    return ctx.db.workspace.findMany({
      where: {
        workspaceMembers: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        workspaceType: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  getActiveWorkspace: protectedProcedure.query(async ({ ctx }) => {
    const workspaceId = ctx.session!.session.activeWorkspaceId;
    return ctx.db.workspace.findFirst({
      where: {
        id: workspaceId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        workspaceType: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  updateWorkspace: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;
      const workspaceId = ctx.session!.session.activeWorkspaceId;
      await ctx.db.workspace.update({
        where: {
          id: workspaceId,
        },
        data: {
          name,
          description,
        },
      });
    }),

  deleteWorkspace: protectedProcedure.mutation(async ({ ctx }) => {
    const sessionId = ctx.session!.session.id;
    const workspaceId = ctx.session!.session.activeWorkspaceId;
    const workspace = await ctx.db.workspace.findFirst({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Workspace not found",
      });
    }

    if (workspace.workspaceType === WorkspaceType.PERSONAL) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Personal workspace cannot be deleted",
      });
    }

    const defaultWorkspace = await ctx.db.workspace.findFirst({
      where: {
        workspaceType: WorkspaceType.PERSONAL,
        workspaceMembers: {
          some: {
            userId: ctx.session!.user.id,
          },
        },
      },
    });

    await ctx.db.$transaction([
      ctx.db.session.update({
        where: {
          id: sessionId,
        },
        data: {
          activeWorkspaceId: defaultWorkspace?.id,
        },
      }),
      ctx.db.workspace.delete({
        where: {
          id: workspaceId,
        },
      }),
    ]);

    const storage = getStorageAdapter();
    // Delete old avatar if it exists and is stored locally or in blob storage
    if (workspace.image) {
      await storage.delete(workspace.image);
    }
  }),

  /**
   * Upload or update workspace image
   */
  uploadImage: protectedProcedure
    .input(uploadImageSchema)
    .mutation(async ({ ctx, input }) => {
      const currentImage = ctx.session!.user.image;

      // Decode base64 file data
      const fileBuffer = Buffer.from(input.fileBase64, "base64");

      // Validate file size
      if (fileBuffer.length > MAX_FILE_SIZE) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024}KB`,
        });
      }

      const storage = getStorageAdapter();

      // Delete old avatar if it exists and is stored locally or in blob storage
      if (currentImage) {
        await storage.delete(currentImage);
      }

      // Upload new avatar
      const newImageUrl = await storage.upload(
        fileBuffer,
        input.fileName,
        input.contentType
      );

      // Update workspace image with new image URL
      await ctx.db.workspace.update({
        where: {
          id: ctx.session!.session.activeWorkspaceId,
        },
        data: {
          image: newImageUrl,
        },
      });

      return {
        imageUrl: newImageUrl,
        message: "Image uploaded successfully",
      };
    }),
});

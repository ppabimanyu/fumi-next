import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import {
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
} from "@/generated/prisma/enums";
import { TRPCError } from "@trpc/server";

const sortableFields = [
  "createdAt",
  "role",
  "status",
  "name",
  "email",
] as const;

export const workspaceMemberRouter = createTRPCRouter({
  selectMember: protectedProcedure.query(async ({ ctx }) => {
    const workspaceId = ctx.session!.session.activeWorkspaceId;
    const members = await ctx.db.workspaceMember.findMany({
      where: {
        workspaceId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return members;
  }),

  listMembers: protectedProcedure
    .input(
      z.object({
        search: z.string().trim().optional(),
        sortBy: z.enum(sortableFields).optional().default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
        status: z.array(z.enum(WorkspaceMemberStatus)).optional(),
        role: z.array(z.enum(WorkspaceMemberRole)).optional(),
        page: z.number().int().positive().optional().default(1),
        limit: z.number().int().min(1).max(100).optional().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const workspaceId = ctx.session!.session.activeWorkspaceId;
      const { search, sortOrder, sortBy, status, role, page, limit } = input;

      // Build type-safe where clause
      const where = {
        workspaceId,
        // Apply status filter if provided (multi-select)
        ...(status && status.length > 0 && { status: { in: status } }),
        // Apply role filter if provided (multi-select)
        ...(role && role.length > 0 && { role: { in: role } }),
        // Apply search filter on user name or email if provided
        ...(search && {
          OR: [
            {
              user: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
            {
              user: {
                email: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }),
      };

      // Build orderBy clause - handle user relation fields
      const orderBy =
        sortBy === "name" || sortBy === "email"
          ? { user: { [sortBy]: sortOrder } }
          : { [sortBy]: sortOrder };

      // Calculate pagination offset
      const skip = (page - 1) * limit;

      // Execute queries in parallel for better performance
      const [members, total] = await Promise.all([
        ctx.db.workspaceMember.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        }),
        ctx.db.workspaceMember.count({ where }),
      ]);

      // Calculate pagination metadata
      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        data: members,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
      };
    }),

  inviteMember: protectedProcedure.mutation(() => {}),

  removeMember: protectedProcedure
    .input(
      z.object({
        memberId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { memberId } = input;
      const userId = ctx.session!.session.userId;
      const workspaceId = ctx.session!.session.activeWorkspaceId;

      const currentUserRole = await ctx.db.workspaceMember.findFirst({
        where: {
          workspaceId,
          userId,
        },
      });

      if (
        !currentUserRole ||
        (currentUserRole.role != WorkspaceMemberRole.OWNER &&
          currentUserRole.role != WorkspaceMemberRole.ADMIN)
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to remove this member",
        });
      }

      await ctx.db.workspaceMember.delete({
        where: {
          id: memberId,
        },
      });
    }),

  changeMemberRole: protectedProcedure
    .input(
      z.object({
        memberId: z.string(),
        role: z.enum(WorkspaceMemberRole),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { memberId, role } = input;
      const userId = ctx.session!.session.userId;
      const workspaceId = ctx.session!.session.activeWorkspaceId;

      const currentUserRole = await ctx.db.workspaceMember.findFirst({
        where: {
          workspaceId,
          userId,
        },
      });

      if (
        !currentUserRole ||
        (currentUserRole.role != WorkspaceMemberRole.OWNER &&
          currentUserRole.role != WorkspaceMemberRole.ADMIN)
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to change the role of this member",
        });
      }

      await ctx.db.workspaceMember.update({
        where: {
          id: memberId,
        },
        data: {
          role,
        },
      });
    }),
});

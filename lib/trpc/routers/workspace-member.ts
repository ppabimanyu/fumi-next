import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import {
  WorkspaceMemberRole,
  WorkspaceMemberStatus,
} from "@/generated/prisma/enums";

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
        status: z.enum(WorkspaceMemberStatus).optional(),
        role: z.enum(WorkspaceMemberRole).optional(),
        page: z.number().int().positive().optional().default(10),
        limit: z.number().int().min(1).max(100).optional().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const workspaceId = ctx.session!.session.activeWorkspaceId;
      const { search, sortOrder, sortBy, status, role, page, limit } = input;

      // Build type-safe where clause
      const where = {
        workspaceId,
        // Apply status filter if provided
        ...(status && { status }),
        // Apply role filter if provided
        ...(role && { role }),
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
  removeMember: protectedProcedure.mutation(() => {}),
  changeMemberRole: protectedProcedure.mutation(() => {}),
});

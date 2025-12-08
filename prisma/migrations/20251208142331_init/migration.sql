-- CreateEnum
CREATE TYPE "WorkspaceType" AS ENUM ('PERSONAL', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "WorkspaceMemberRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "WorkspaceMemberStatus" AS ENUM ('ACTIVE', 'PENDING');

-- CreateTable
CREATE TABLE "t_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twoFactorEnabled" BOOLEAN DEFAULT false,

    CONSTRAINT "t_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_sessions" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "activeWorkspaceId" TEXT,

    CONSTRAINT "t_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_accounts" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_verifications" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_two_factors" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "backupCodes" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "t_two_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceCurrency" TEXT NOT NULL,
    "maxWorkspace" INTEGER NOT NULL,
    "maxProject" INTEGER NOT NULL,
    "aiAccess" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workspaceType" "WorkspaceType" NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_workspace_members" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "WorkspaceMemberRole" NOT NULL,
    "status" "WorkspaceMemberStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_workspace_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_workspace_member_invitations" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "WorkspaceMemberRole" NOT NULL,
    "token" TEXT NOT NULL,
    "invitorId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_workspace_member_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT 'PROJ',
    "image" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "t_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_issue_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isCanceled" BOOLEAN NOT NULL DEFAULT false,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_issue_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_issues" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_sub_task_issues" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_sub_task_issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_assignees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_assignees_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "t_users_email_key" ON "t_users"("email");

-- CreateIndex
CREATE INDEX "t_sessions_userId_idx" ON "t_sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "t_sessions_token_key" ON "t_sessions"("token");

-- CreateIndex
CREATE INDEX "t_accounts_userId_idx" ON "t_accounts"("userId");

-- CreateIndex
CREATE INDEX "t_verifications_identifier_idx" ON "t_verifications"("identifier");

-- CreateIndex
CREATE INDEX "t_two_factors_secret_idx" ON "t_two_factors"("secret");

-- CreateIndex
CREATE INDEX "t_two_factors_userId_idx" ON "t_two_factors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "t_subscriptions_userId_key" ON "t_subscriptions"("userId");

-- CreateIndex
CREATE INDEX "_assignees_B_index" ON "_assignees"("B");

-- AddForeignKey
ALTER TABLE "t_sessions" ADD CONSTRAINT "t_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_accounts" ADD CONSTRAINT "t_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_two_factors" ADD CONSTRAINT "t_two_factors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_subscriptions" ADD CONSTRAINT "t_subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "t_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_subscriptions" ADD CONSTRAINT "t_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_workspace_members" ADD CONSTRAINT "t_workspace_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_workspace_members" ADD CONSTRAINT "t_workspace_members_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "t_workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_workspace_member_invitations" ADD CONSTRAINT "t_workspace_member_invitations_invitorId_fkey" FOREIGN KEY ("invitorId") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_workspace_member_invitations" ADD CONSTRAINT "t_workspace_member_invitations_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "t_workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_projects" ADD CONSTRAINT "t_projects_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "t_workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_issue_statuses" ADD CONSTRAINT "t_issue_statuses_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "t_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_issues" ADD CONSTRAINT "t_issues_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_sub_task_issues" ADD CONSTRAINT "t_sub_task_issues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "t_issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assignees" ADD CONSTRAINT "_assignees_A_fkey" FOREIGN KEY ("A") REFERENCES "t_issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assignees" ADD CONSTRAINT "_assignees_B_fkey" FOREIGN KEY ("B") REFERENCES "t_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

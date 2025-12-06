"use client";

import {
  LockIcon,
  Palette,
  ShieldCheck,
  UserIcon,
  MonitorSmartphone,
  Settings,
  CreditCard,
} from "lucide-react";
import { env } from "@/env";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProfilePage } from "./_components/profile/profile";
import { SettingsPasswordPage } from "./_components/password/password";
import { SettingsSessionsPage } from "./_components/sessions/sessions";
import { SettingsTwoFactorAuthPage } from "./_components/two-factor-auth/two-factor-auth";
import { SettingsAppearancePage } from "./_components/appearance/apperance";
import { SettingsBillingPage } from "./_components/billing/billing";
import { PageDescription, PageTitle } from "@/components/page";
import SeparatorFull from "@/components/separator-full";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full w-full mx-auto space-y-4">
      <div className="space-y-0">
        <PageTitle className="flex items-center gap-2">
          <Settings className="size-5" />
          Settings
        </PageTitle>
        <PageDescription>
          Manage your account settings and security preferences.
        </PageDescription>
      </div>
      <SeparatorFull />
      <Tabs
        defaultValue="profile"
        className="w-full md:w-3xl mx-auto space-y-8"
      >
        <div>
          <TabsList className="w-full overflow-x-auto">
            <TabsTrigger value="profile">
              <UserIcon className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password">
              <LockIcon className="size-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <MonitorSmartphone className="size-4" />
              Sessions
            </TabsTrigger>
            {env.NEXT_PUBLIC_AUTH_ENABLE_2FA && (
              <TabsTrigger value="two-factor-auth">
                <ShieldCheck className="size-4" />
                Two-Factor Auth
              </TabsTrigger>
            )}
            <TabsTrigger value="billing">
              <CreditCard className="size-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="size-4" />
              Appearance
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile">
          <SettingsProfilePage />
        </TabsContent>
        <TabsContent value="password">
          <SettingsPasswordPage />
        </TabsContent>
        <TabsContent value="sessions">
          <SettingsSessionsPage />
        </TabsContent>
        <TabsContent value="two-factor-auth">
          <SettingsTwoFactorAuthPage />
        </TabsContent>
        <TabsContent value="billing">
          <SettingsBillingPage />
        </TabsContent>
        <TabsContent value="appearance">
          <SettingsAppearancePage />
        </TabsContent>
      </Tabs>
    </div>
  );
}

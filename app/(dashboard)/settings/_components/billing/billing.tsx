"use client";

import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionItem,
  SectionItemContent,
  SectionItemDescription,
  SectionItemHeader,
  SectionItemTitle,
  SectionTitle,
} from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Receipt,
  Sparkles,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

export function SettingsBillingPage() {
  return (
    <div className="space-y-8">
      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <Sparkles className="size-5" />
            Current Plan
          </SectionTitle>
          <SectionDescription>
            Manage your subscription and billing details.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>
                Pro Plan
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <CheckCircle2 className="size-3" />
                  Active
                </Badge>
              </SectionItemTitle>
              <SectionItemDescription>
                Unlimited projects, 50 team members, priority support, and
                advanced analytics.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">$29</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Billing Cycle</SectionItemTitle>
              <SectionItemDescription>
                Your next billing date and current cycle information.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="size-4 text-muted-foreground" />
                <span>Next billing: January 5, 2025</span>
              </div>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Upgrade Plan</SectionItemTitle>
              <SectionItemDescription>
                Need more features? Upgrade to Enterprise for unlimited
                everything.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Button variant="outline" size="sm">
                <ArrowUpRight className="size-4" />
                View Plans
              </Button>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Payment Method
          </SectionTitle>
          <SectionDescription>
            Manage your payment methods and billing information.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Credit Card</SectionItemTitle>
              <SectionItemDescription>
                Your primary payment method for subscriptions.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                <div className="size-10 rounded bg-linear-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                  <CreditCard className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Update Payment Method</SectionItemTitle>
              <SectionItemDescription>
                Add a new card or update your existing payment information.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Button variant="outline" size="sm">
                <CreditCard className="size-4" />
                Update Card
              </Button>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <Receipt className="size-5" />
            Billing History
          </SectionTitle>
          <SectionDescription>
            View and download your past invoices.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <div className="space-y-2">
            {[
              { date: "Dec 5, 2024", amount: "$29.00", status: "Paid" },
              { date: "Nov 5, 2024", amount: "$29.00", status: "Paid" },
              { date: "Oct 5, 2024", amount: "$29.00", status: "Paid" },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Receipt className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{invoice.date}</p>
                    <p className="text-xs text-muted-foreground">
                      Pro Plan - Monthly
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{invoice.amount}</span>
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-600 border-green-500/20"
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionContent>
      </Section>
    </div>
  );
}

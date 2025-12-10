import Link from "next/link";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import {
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  LayoutGrid,
  ListTodo,
  Users2,
  Zap,
  Shield,
  Sparkles,
  Building2,
} from "lucide-react";

export default function Home() {
  const appName = env.NEXT_PUBLIC_APP_NAME || "Fumi";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">{appName}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/sign-up">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-chart-2/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-chart-3/20 blur-[80px]" />
          </div>

          <div className="container mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  The modern way to manage projects
                </span>
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Build better products
                <br />
                <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  together, faster
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Streamline your workflow with intuitive project management.
                Track issues, collaborate with your team, and ship products
                faster than ever before.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/auth/sign-up">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/dashboard">View Demo</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-muted to-muted-foreground/20 text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by{" "}
                  <span className="font-semibold text-foreground">2,000+</span>{" "}
                  teams worldwide
                </p>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative mt-16 md:mt-24">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-border/50 bg-card/50 p-2 shadow-2xl backdrop-blur-sm">
                <div className="rounded-lg border border-border/50 bg-background/80 p-4">
                  {/* Mock Dashboard Header */}
                  <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-destructive/70" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                      <div className="h-3 w-3 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1">
                      <div className="mx-auto h-6 w-64 rounded-md bg-muted/50" />
                    </div>
                  </div>

                  {/* Mock Kanban Board */}
                  <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
                    {["Backlog", "In Progress", "Review", "Done"].map(
                      (column, idx) => (
                        <div
                          key={column}
                          className={`space-y-3 ${
                            idx === 3 ? "hidden md:block" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                idx === 0
                                  ? "bg-muted-foreground"
                                  : idx === 1
                                  ? "bg-yellow-500"
                                  : idx === 2
                                  ? "bg-primary"
                                  : "bg-green-500"
                              }`}
                            />
                            {column}
                          </div>
                          {[1, 2, 3]
                            .slice(0, idx === 1 ? 2 : idx === 3 ? 1 : 3)
                            .map((card) => (
                              <div
                                key={card}
                                className="rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-sm"
                              >
                                <div className="mb-2 h-3 w-3/4 rounded bg-muted" />
                                <div className="h-2 w-1/2 rounded bg-muted/50" />
                              </div>
                            ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="border-t border-border/40 bg-muted/30"
        >
          <div className="container mx-auto px-4 py-24 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <Zap className="h-3.5 w-3.5" />
                Features
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Everything you need to ship faster
              </h2>
              <p className="text-lg text-muted-foreground">
                Powerful features designed for modern teams. From planning to
                shipping, we&apos;ve got you covered.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: FolderKanban,
                  title: "Projects",
                  description:
                    "Organize your work into projects. Keep everything structured and easy to navigate.",
                },
                {
                  icon: ListTodo,
                  title: "Issues & Tasks",
                  description:
                    "Track issues with priorities, due dates, and assignees. Never miss a deadline.",
                },
                {
                  icon: LayoutGrid,
                  title: "Kanban Boards",
                  description:
                    "Visualize your workflow with customizable Kanban boards. Drag and drop to update.",
                },
                {
                  icon: Users2,
                  title: "Team Collaboration",
                  description:
                    "Invite team members, assign roles, and collaborate in real-time.",
                },
                {
                  icon: Building2,
                  title: "Workspaces",
                  description:
                    "Create workspaces for different teams or organizations. Keep work separate.",
                },
                {
                  icon: Shield,
                  title: "Secure by Default",
                  description:
                    "Two-factor authentication, role-based access, and enterprise-grade security.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted/50">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="border-t border-border/40">
          <div className="container mx-auto px-4 py-24 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-chart-2/20 bg-chart-2/10 px-3 py-1 text-sm text-chart-2">
                <CheckCircle2 className="h-3.5 w-3.5" />
                How it works
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Get started in minutes
              </h2>
              <p className="text-lg text-muted-foreground">
                Three simple steps to transform how your team works together.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create your workspace",
                  description:
                    "Sign up and create a workspace for your team. Invite members and set up roles.",
                },
                {
                  step: "02",
                  title: "Set up projects",
                  description:
                    "Create projects to organize your work. Define issue statuses and workflows.",
                },
                {
                  step: "03",
                  title: "Start shipping",
                  description:
                    "Add issues, track progress on Kanban boards, and collaborate with your team.",
                },
              ].map((item, idx) => (
                <div key={item.step} className="relative text-center">
                  {idx < 2 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-border via-primary/30 to-border md:block" />
                  )}
                  <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card text-2xl font-bold text-primary shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="border-t border-border/40 bg-muted/30"
        >
          <div className="container mx-auto px-4 py-24 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-chart-3/20 bg-chart-3/10 px-3 py-1 text-sm text-chart-3">
                <Users2 className="h-3.5 w-3.5" />
                Testimonials
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Loved by teams everywhere
              </h2>
              <p className="text-lg text-muted-foreground">
                See what our users have to say about their experience.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "This tool has completely transformed how our team manages projects. The Kanban boards are intuitive and powerful.",
                  name: "Sarah Chen",
                  role: "Product Manager",
                  company: "TechFlow",
                },
                {
                  quote:
                    "Finally, a project management tool that doesn't get in the way. Clean, fast, and exactly what we needed.",
                  name: "Marcus Johnson",
                  role: "Engineering Lead",
                  company: "DevStack",
                },
                {
                  quote:
                    "The workspace feature is a game-changer for managing multiple client projects. Highly recommended!",
                  name: "Emily Rodriguez",
                  role: "Agency Owner",
                  company: "Creative Labs",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
                >
                  <p className="mb-6 text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 text-sm font-medium text-primary-foreground">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border/40">
          <div className="container mx-auto px-4 py-24 md:px-6">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-chart-2/10 p-8 md:p-12">
              {/* Background decoration */}
              <div className="absolute right-0 top-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-24 translate-y-24 rounded-full bg-chart-2/20 blur-3xl" />

              <div className="relative text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
                  Join thousands of teams already using {appName} to build
                  better products. Start your free trial today.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/auth/sign-up">
                      Start for free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/support">Contact Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  {appName}
                </span>
              </Link>
              <p className="mb-4 max-w-xs text-sm text-muted-foreground">
                The modern project management tool for teams who ship fast.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {appName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

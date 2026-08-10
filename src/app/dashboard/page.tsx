"use client";

import { Lightbulb, TrendingUp, ArrowUpRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Line,
  LineChart,
} from "recharts";
import { useContext } from "react";
import { DarkModeContext } from "@/providers/dark-mode";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { InkItem, InkStagger, Reveal } from "@/components/ui/motion";

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const Dashboard = () => {
  const { dashboard } = useContext(DarkModeContext);

  if (!dashboard) return redirect("/upload");

  const monthlyChartData = dashboard.monthlySpending.map((item) => ({
    month: item.month,
    amount: item.spent,
  }));

  const categoryChartData = dashboard.categories.map((item, index) => ({
    category: item.category,
    amount: item.amount,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const monthlyChartConfig = {
    amount: {
      label: "Amount",
      color: "var(--chart-1)",
    },
  };

  const categoryChartConfig = dashboard.categories.reduce(
    (config, cat, index) => {
      config[cat.category] = {
        label: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
      return config;
    },
    {
      amount: {
        label: "Amount",
      },
    } as Record<string, { label: string; color?: string }>
  );

  const confidenceTone =
    dashboard.confidence.number >= 70
      ? "bg-brand"
      : "bg-destructive";

  return (
    <div className="page-shell atmosphere-muted page-offset min-h-screen pb-16">
      <div className="section-container py-6 md:py-10">
        <Reveal className="mb-8 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display mb-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Expense dashboard
            </h1>
            <p className="text-muted-foreground">
              Spending patterns and insights from your latest upload
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="w-fit shrink-0">
            <Link href="/price">
              Free plan
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </Reveal>

        <InkStagger className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          <InkItem>
            <div className="border-t border-border pt-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Total spending
              </p>
              <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {dashboard.currencysymbol}
                {dashboard.totalAmount.toFixed(2)}
              </p>
            </div>
          </InkItem>
          <InkItem>
            <div className="border-t border-border pt-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Categories
              </p>
              <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {dashboard.categories.length}
              </p>
            </div>
          </InkItem>
          <InkItem>
            <div className="border-t border-border pt-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Months tracked
              </p>
              <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {dashboard.monthlySpending.length}
              </p>
            </div>
          </InkItem>
          <InkItem>
            <div className="border-t border-border pt-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Confidence
              </p>
              <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {dashboard.confidence.number}%
              </p>
            </div>
          </InkItem>
        </InkStagger>

        <Reveal delay={0.06} className="mb-8 flex gap-3 border-l-2 border-l-brand bg-brand/5 px-4 py-4 md:px-5">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <h3 className="font-display mb-1 font-semibold">Smart tip</h3>
            <div className="space-y-1 text-sm leading-relaxed text-muted-foreground">
              <p>{dashboard.tip.part1}</p>
              <p>{dashboard.tip.part2}</p>
            </div>
          </div>
        </Reveal>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-border/70 bg-card/90">
            <CardHeader className="pb-2">
              <CardTitle className="font-display font-semibold">
                Monthly spending
              </CardTitle>
              <CardDescription>Your spending by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={monthlyChartConfig}>
                <BarChart accessibilityLayer data={monthlyChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand" />
                Showing spending for tracked months
              </div>
            </CardFooter>
          </Card>

          <Card className="flex flex-col border-border/70 bg-card/90">
            <CardHeader className="pb-2">
              <CardTitle className="font-display font-semibold">
                Spending by category
              </CardTitle>
              <CardDescription>Breakdown of your expenses</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={categoryChartConfig}
                className="mx-auto aspect-square max-h-[240px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={categoryChartData}
                    dataKey="amount"
                    nameKey="category"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-3 text-sm">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {dashboard.categories.map((cat, index) => (
                  <div key={cat.category} className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 shrink-0"
                      style={{
                        backgroundColor:
                          CHART_COLORS[index % CHART_COLORS.length],
                      }}
                    />
                    <span className="capitalize text-muted-foreground">
                      {cat.category}: {dashboard.currencysymbol}
                      {cat.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-6 border-border/70 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="font-display font-semibold">
              Spending trend
            </CardTitle>
            <CardDescription>
              Track your spending pattern over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={monthlyChartConfig}
              className="h-[260px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={monthlyChartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="amount"
                  type="monotone"
                  stroke="var(--color-amount)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="border-t border-border pt-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold">
              Data confidence
            </h3>
            <span
              className={`px-2 py-0.5 text-sm font-medium ${
                dashboard.confidence.number >= 70
                  ? "bg-brand/10 text-brand"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {dashboard.confidence.number}%
            </span>
          </div>
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {dashboard.confidence.text}
          </p>
          <div className="h-1.5 w-full max-w-md overflow-hidden bg-muted">
            <div
              className={`h-full transition-all duration-500 ${confidenceTone}`}
              style={{ width: `${dashboard.confidence.number}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

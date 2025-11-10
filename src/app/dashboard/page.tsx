"use client";
import { Lightbulb, TrendingUp, DollarSign, Calendar } from "lucide-react";
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
import { DarkModeContext } from "@/lib/darkmode";
import { redirect } from "next/navigation";
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
import CardComponent from "@/components/ui/CardComponent";

// Color palette for pie chart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#E91E63",
  "#9C27B0",
  "#4CAF50",
  "#FF5722",
  "#607D8B",
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
    fill: COLORS[index % COLORS.length],
  }));

  // Chart configs
  const monthlyChartConfig = {
    amount: {
      label: "Amount",
      color: "#0088FE",
    },
  };

  const categoryChartConfig = dashboard.categories.reduce(
    (config, cat, index) => {
      config[cat.category] = {
        label: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
        color: COLORS[index % COLORS.length],
      };
      return config;
    },
    {
      amount: {
        label: "Amount",
      },
    } as Record<string, { label: string; color?: string }>
  );

  console.log(dashboard);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors pt-[90px]">
      <CardComponent
        name={"Your Current Plan"}
        price={"$0"}
        period={"/month"}
        features={[
          "Upload CSV/PDF/Image for finance tracking",
          "Only up to 250 financial data entries per file",
          "Limited VedAI queries",
        ]}
        buttonText={"Upgrade to Pro"}
        buttonVariant={"default"}
      />
      <div className="max-w-7xl mx-auto mt-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Expense Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your spending patterns and get insights
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Amount Card */}
          <div className="bg-white dark:bg-black rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors flex flex-col justify-center min-h-[150px]">
            <div className="flex items-center justify-between">
              <div className="lg:flex lg:flex-col lg:gap-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Spending
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {dashboard.currencysymbol}
                  {dashboard.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full transition-colors">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Categories Count */}
          <div className="bg-white dark:bg-black rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors flex flex-col justify-center min-h-[150px]">
            <div className="flex items-center justify-between">
              <div className="lg:flex lg:flex-col lg:gap-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Categories
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {dashboard.categories.length}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full transition-colors">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700 rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-full transition-colors">
                <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Smart Tip
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed flex flex-col gap-2">
                  <p>{dashboard.tip.part1}</p>
                  <p>{dashboard.tip.part2}</p>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Spending Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending</CardTitle>
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
                  <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                <TrendingUp className="h-4 w-4" />
                Showing spending for tracked months
              </div>
            </CardFooter>
          </Card>

          {/* Category Pie Chart */}
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Breakdown of your expenses</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={categoryChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
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
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                <TrendingUp className="h-4 w-4" />
                Monitor your spending trends to identify patterns
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                {dashboard.categories.map((cat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-muted-foreground capitalize">
                      {cat.category}: {dashboard.currencysymbol}
                      {cat.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Monthly Trend Line Chart */}
        <Card className="max-h-[90vh]">
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
            <CardDescription>
              Track your spending pattern over time
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer
              config={monthlyChartConfig}
              className="max-h-[60vh] flex-1"
            >
              <LineChart
                accessibilityLayer
                data={monthlyChartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
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
                  type="linear"
                  stroke="var(--color-amount)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              <TrendingUp className="h-4 w-4" />
              Monitor your spending trends to identify patterns
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Confidence Score */}
      <div className="max-w-7xl mx-auto mt-5">
        <div className="bg-white dark:bg-black rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Data Confidence Score
                </h3>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    dashboard.confidence.number >= 95
                      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                      : dashboard.confidence.number >= 85
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : dashboard.confidence.number >= 70
                      ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
                      : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {dashboard.confidence.number}%
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {dashboard.confidence.text}
              </p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                dashboard.confidence.number >= 95
                  ? "bg-green-500"
                  : dashboard.confidence.number >= 85
                  ? "bg-blue-500"
                  : dashboard.confidence.number >= 70
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${dashboard.confidence.number}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

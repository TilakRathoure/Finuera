'use client'
import { Lightbulb, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, XAxis, LineChart, Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { DarkModeContext } from "@/lib/darkmode";
import { redirect } from "next/navigation";

const mockDashboardData = {
  "error": false,
  "totalAmount": 154.06,
  "monthlySpending": [
    {
      "month": "February",
      "spent": 154.06
    }
  ],
  "categories": [
    {
      "category": "transportation",
      "amount": 154.06
    }
  ],
  "tip": "Your February spending was dominated by transportation costs at $154.06, suggesting a significant expense related to vehicle repair. Consider reviewing your vehicle maintenance schedule and exploring options for preventative maintenance to reduce future high-cost repairs. Also, shop around for future repairs to ensure you're receiving competitive pricing.",
  "chartconfig": {
    "transportation": {
      "label": "Transportation",
      "color": "#90ee90"
    }
  }
};

const Dashboard = () => {
  const { dashboard } = useContext(DarkModeContext);

  if (!dashboard) return redirect("/upload");

  const monthlyChartData = dashboard.monthlySpending.map(item => ({
    month: item.month,
    amount: item.spent
  }));

  const categoryChartData = dashboard.categories.map(item => ({
    category: item.category,
    amount: item.amount,
    fill: "#8884d8"
  }));

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors pt-[150px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Expense Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your spending patterns and get insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Amount Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spending</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  ${dashboard.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full transition-colors">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Categories Count */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
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
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Smart Tip</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  {dashboard.tip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Spending Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 transition-colors">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Monthly Spending</h3>
              <p className="text-gray-600 dark:text-gray-400">Your spending by month</p>
            </div>
            <div className="p-6 w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="px-6 pb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-4 w-4" />
              Showing spending for tracked months
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 transition-colors">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Spending by Category</h3>
              <p className="text-gray-600 dark:text-gray-400">Breakdown of your expenses</p>
            </div>
            <div className="p-6 h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    labelLine={false}
                    label={({ category }) => category}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-4">
                {dashboard.categories.map((cat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "#8884d8" }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {cat.category}: ${cat.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 transition-colors">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Spending Trend</h3>
            <p className="text-gray-600 dark:text-gray-400">Track your spending pattern over time</p>
          </div>
          <div className="p-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="px-6 pb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp className="h-4 w-4" />
            Monitor your spending trends to identify patterns
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

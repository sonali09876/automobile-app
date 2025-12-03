import React from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  // Revenue data
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 52000, expenses: 35000 },
    { month: "Mar", revenue: 48000, expenses: 33000 },
    { month: "Apr", revenue: 61000, expenses: 38000 },
    { month: "May", revenue: 55000, expenses: 36000 },
    { month: "Jun", revenue: 67000, expenses: 40000 }
  ];

  // Users data
  const usersData = [
    { month: "Jan", users: 850 },
    { month: "Feb", users: 920 },
    { month: "Mar", users: 1050 },
    { month: "Apr", users: 1180 },
    { month: "May", users: 1320 },
    { month: "Jun", users: 1450 }
  ];

  // Orders data
  const ordersData = [
    { day: "Mon", orders: 45 },
    { day: "Tue", orders: 52 },
    { day: "Wed", orders: 48 },
    { day: "Thu", orders: 68 },
    { day: "Fri", orders: 72 },
    { day: "Sat", orders: 85 },
    { day: "Sun", orders: 65 }
  ];

  // Categories
  const categoryData = [
    { name: "Electronics", value: 35 },
    { name: "Automobiles", value: 28 },
    { name: "Cars Eletronics", value: 20 },
    { name: "Others", value: 17 }
  ];

  const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

  const stats = [
    {
      icon: Users,
      title: "Total Users",
      value: "1,450",
      change: "+12%",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShoppingCart,
      title: "Total Orders",
      value: "435",
      change: "+8%",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "Revenue",
      value: "₹67,000",
      change: "+23%",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Growth Rate",
      value: "23%",
      change: "+5%",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 md:px-6 md:py-6">

      {/* Mobile Optimized Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        Admin Dashboard
      </h1>

      {/* Stats Cards - Mobile Single Column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}>
                <stat.icon className="text-white" size={22} />
              </div>
              <span className="text-sm font-semibold text-green-600">
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 mt-3 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts - Mobile Friendly Stacking */}
      <div className="space-y-6">

        {/* Revenue Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-bold mb-3">Revenue & Expenses</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#3B82F6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#EF4444" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="url(#rev)" />
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="url(#exp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Orders */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-bold mb-3">Weekly Orders</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-bold mb-3">User Growth</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10B981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-bold mb-3">Category Distribution</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

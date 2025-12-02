import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useAuth } from "../Context/authContext";
import { getDashboardOverview } from "../services/dashboard";

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getDashboardOverview();
        setData(res.data.data);

        setLoading(false);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
          <div className=" w-[100px] h-[100px] border-4 border-blue-500 border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- 2. Error State ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-500">
        <p className="text-xl font-semibold">Oops! Something went wrong.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // --- 3. Empty State (No Notes yet) ---
  if (data?.totals?.notes === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-4xl mb-6">
          📝
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.username || "Friend"}! 👋
        </h2>
        <p className="text-gray-500 mt-2 mb-8 max-w-md">
          Your dashboard is looking a bit empty. Create your first smart note to
          get AI summaries and quizzes!
        </p>
        <Link
          to="/app/create-note"
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:shadow-blue-200 transition transform active:scale-95"
        >
          Create First Note 🚀
        </Link>
      </div>
    );
  }

  // --- 4. Main Dashboard UI ---
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in bg-gray-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {getGreeting()}, {user?.username}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here is your daily learning overview.
          </p>
        </div>
        <Link
          to="/app/create-note"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md flex items-center gap-2"
        >
          <span>+</span> Create Note
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Notes"
          count={data.totals.notes}
          icon="📝"
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          title="AI Summaries"
          count={data.totals.summaries}
          icon="✨"
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          title="Quizzes Generated"
          count={data.totals.quizzes}
          icon="🧠"
          color="bg-orange-50 text-orange-600"
        />
        <StatsCard
          title="Quiz Attempts"
          count={data.graphs.quizActivity.reduce(
            (acc: any, curr: any) => acc + curr.attempts,
            0
          )}
          icon="🎯"
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Notes Creation Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Notes Created (Last 7 Days)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.graphs.notesCreation}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#eff6ff" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Quiz Performance Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Quiz Activity & Avg Score
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.graphs.quizActivity}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Notes List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Recent Notes</h3>
          <Link
            to="/app/notes"
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                <th className="pb-3 pl-2 font-medium">Note Title</th>
                <th className="pb-3 font-medium">Created Date</th>
                <th className="pb-3 font-medium">Tags</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.recentNotes.map((note: any) => (
                <tr
                  key={note._id}
                  className="group hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                >
                  <td className="py-4 pl-2 font-semibold text-gray-700 group-hover:text-blue-600 transition">
                    {note.title}
                  </td>
                  <td className="py-4 text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <div className="flex gap-1">
                      {note.tags?.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      to={`/app/notes/${note._id}`}
                      className="text-blue-500 hover:text-blue-700 font-medium text-xs border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.recentNotes.length === 0 && (
            <p className="text-center text-gray-400 py-4">
              No recent notes found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Reusable Stats Card Component ---
const StatsCard = ({ title, count, icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
    </div>
  </div>
);

export default Dashboard;

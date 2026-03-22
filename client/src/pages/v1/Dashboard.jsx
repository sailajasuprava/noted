import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── Dummy Data ────────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Posts", value: "128", icon: "✍️", change: "+4 this week" },
  {
    label: "Total Views",
    value: "94.2K",
    icon: "👁️",
    change: "+12% vs last month",
  },
  { label: "Followers", value: "3,810", icon: "👥", change: "+230 this month" },
  { label: "Comments", value: "1,540", icon: "💬", change: "+88 this week" },
];

const viewsData = [
  { name: "Jan", views: 3200 },
  { name: "Feb", views: 4800 },
  { name: "Mar", views: 4100 },
  { name: "Apr", views: 6200 },
  { name: "May", views: 5300 },
  { name: "Jun", views: 7800 },
  { name: "Jul", views: 9100 },
];

const trafficData = [
  { name: "Mon", visitors: 420 },
  { name: "Tue", visitors: 610 },
  { name: "Wed", visitors: 530 },
  { name: "Thu", visitors: 780 },
  { name: "Fri", visitors: 920 },
  { name: "Sat", visitors: 560 },
  { name: "Sun", visitors: 340 },
];

const tagData = [
  { name: "Technology", value: 38, color: "#3ecdc4" },
  { name: "Lifestyle", value: 22, color: "#117a7a" },
  { name: "Travel", value: 18, color: "#0fa8a0" },
  { name: "Health", value: 14, color: "#5ee8e0" },
  { name: "Finance", value: 8, color: "#0c3f3f" },
];

const recentPosts = [
  {
    title: "The Future of AI in Everyday Life",
    status: "Published",
    views: 4320,
    date: "Mar 20, 2026",
  },
  {
    title: "10 Tips for Mindful Morning Routines",
    status: "Published",
    views: 2810,
    date: "Mar 18, 2026",
  },
  {
    title: "Why Solo Travel Changes You Forever",
    status: "Draft",
    views: 0,
    date: "Mar 17, 2026",
  },
  {
    title: "Understanding Compound Interest at 25",
    status: "Published",
    views: 1950,
    date: "Mar 15, 2026",
  },
  {
    title: "Building a Second Brain with Noted",
    status: "Scheduled",
    views: 0,
    date: "Mar 25, 2026",
  },
];

const recentComments = [
  {
    author: "Priya Sharma",
    post: "Future of AI in Everyday Life",
    comment: "This was incredibly insightful!",
    time: "2h ago",
    avatar: "PS",
  },
  {
    author: "James Liu",
    post: "10 Tips for Mindful Mornings",
    comment: "I've been doing tip #3 for a year now 🙌",
    time: "5h ago",
    avatar: "JL",
  },
  {
    author: "Amara Osei",
    post: "Why Solo Travel Changes You",
    comment: "Absolutely agree with every point here.",
    time: "Yesterday",
    avatar: "AO",
  },
  {
    author: "Lucas Ferreira",
    post: "Compound Interest at 25",
    comment: "Can you write a part 2 on index funds?",
    time: "Yesterday",
    avatar: "LF",
  },
];

const drafts = [
  {
    title: "My 30-Day Digital Detox Experiment",
    updated: "2 hours ago",
    wordCount: "1,200 words",
  },
  {
    title: "Why Solo Travel Changes You Forever",
    updated: "Yesterday",
    wordCount: "980 words",
  },
  {
    title: "The Minimalist's Guide to Productivity",
    updated: "3 days ago",
    wordCount: "640 words",
  },
];

const scheduled = [
  {
    title: "Building a Second Brain with Noted",
    date: "Mar 25, 2026",
    time: "9:00 AM",
  },
  { title: "Summer Reading List 2026", date: "Apr 1, 2026", time: "8:00 AM" },
];

const notifications = [
  {
    type: "follow",
    text: "Priya Sharma started following you",
    time: "1h ago",
    icon: "👥",
  },
  {
    type: "comment",
    text: "New comment on 'Future of AI'",
    time: "2h ago",
    icon: "💬",
  },
  {
    type: "like",
    text: "Your post got 50 new likes",
    time: "4h ago",
    icon: "❤️",
  },
  {
    type: "mention",
    text: "James Liu mentioned you in a post",
    time: "6h ago",
    icon: "📣",
  },
  {
    type: "milestone",
    text: "You crossed 3,800 followers!",
    time: "Yesterday",
    icon: "🎉",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    Published:
      "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30",
    Draft: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
    Scheduled: "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const SectionCard = ({ title, icon, children, className = "" }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 ${className}`}
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
    }}
  >
    <h2 className="text-sm font-semibold text-teal-200 uppercase tracking-widest mb-4 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h2>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0c3f3f] border border-teal-500/30 rounded-lg px-3 py-2 text-sm text-teal-100 shadow-xl">
        <p className="font-semibold">{label}</p>
        <p className="text-[#3ecdc4]">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

// ─── Main Dashboard ────────────────────────────────────────────────────────────

function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navItems = ["Dashboard", "Posts", "Comments", "Analytics", "Settings"];

  return (
    <div
      className="min-h-screen font-sans text-white"
      style={{
        background:
          "linear-gradient(135deg, #0c3f3f 0%, #117a7a 50%, #3ecdc4 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #3ecdc4, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #3ecdc4, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex">
        {/* ── Sidebar ── */}
        <aside
          className="hidden lg:flex flex-col w-60 min-h-screen px-4 py-8 border-r border-white/10"
          style={{
            background: "rgba(12,63,63,0.6)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10 px-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
              style={{ background: "linear-gradient(135deg,#3ecdc4,#117a7a)" }}
            >
              ✍
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Noted
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeNav === item
                    ? "bg-white/15 text-white shadow-inner border border-white/10"
                    : "text-teal-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <button className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-teal-200 hover:bg-white/10 hover:text-white transition-all">
              Log Out
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-4 md:px-8 py-8 max-w-screen-xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <p className="text-teal-300 text-sm">Sunday, March 22, 2026</p>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#0c3f3f] transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#3ecdc4,#5ee8e0)",
                }}
              >
                + New Post
              </button>
              <div
                className="w-10 h-10 rounded-full border-2 border-teal-400/50 flex items-center justify-center text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg,#117a7a,#3ecdc4)",
                }}
              >
                S
              </div>
            </div>
          </header>

          {/* ── 1. Stats Strip ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-4 border border-white/10 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6 opacity-10"
                  style={{ background: "#3ecdc4" }}
                />
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-teal-200 font-medium">
                  {s.label}
                </div>
                <div className="text-xs text-teal-400 mt-1">{s.change}</div>
              </div>
            ))}
          </div>

          {/* ── Row 2: Content Performance + Traffic ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Content Performance */}
            <SectionCard title="Content Performance" icon="📈">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={viewsData} barCategoryGap="35%">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#99e6e0", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#99e6e0", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(62,205,196,0.08)" }}
                  />
                  <Bar
                    dataKey="views"
                    radius={[6, 6, 0, 0]}
                    fill="url(#barGrad)"
                  />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3ecdc4" />
                      <stop offset="100%" stopColor="#117a7a" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Audience & Traffic */}
            <SectionCard title="Audience & Traffic" icon="📊">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trafficData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#99e6e0", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#99e6e0", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3ecdc4" />
                      <stop offset="100%" stopColor="#5ee8e0" />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="url(#lineGrad)"
                    strokeWidth={3}
                    dot={{ fill: "#3ecdc4", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </SectionCard>
          </div>

          {/* ── Row 3: Recent Posts + Tags Breakdown ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Posts - spans 2 cols */}
            <SectionCard
              title="Recent Posts"
              icon="📝"
              className="lg:col-span-2"
            >
              <div className="space-y-3">
                {recentPosts.map((post, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-teal-400">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {post.views > 0 && (
                        <span className="text-xs text-teal-300">
                          {post.views.toLocaleString()} views
                        </span>
                      )}
                      <StatusBadge status={post.status} />
                      <button className="text-xs text-teal-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Tags & Categories */}
            <SectionCard title="Tags & Categories" icon="🏷️">
              <div className="flex justify-center mb-4">
                <PieChart width={150} height={150}>
                  <Pie
                    data={tagData}
                    cx={70}
                    cy={70}
                    innerRadius={45}
                    outerRadius={68}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {tagData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="space-y-2">
                {tagData.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: tag.color }}
                      />
                      <span className="text-teal-100">{tag.name}</span>
                    </div>
                    <span className="text-teal-300 font-semibold">
                      {tag.value}%
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── Row 4: Comments + Drafts & Scheduled ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Comments */}
            <SectionCard title="Recent Comments" icon="💬">
              <div className="space-y-4">
                {recentComments.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-[#0c3f3f]"
                      style={{
                        background: "linear-gradient(135deg,#3ecdc4,#5ee8e0)",
                      }}
                    >
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold text-white">
                          {c.author}
                        </p>
                        <span className="text-xs text-teal-400 shrink-0">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-xs text-teal-300 truncate">{c.post}</p>
                      <p className="text-xs text-teal-100 mt-0.5">
                        "{c.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-1.5 text-xs rounded-lg border border-white/15 text-teal-200 hover:bg-white/10 transition-all">
                  Approve All
                </button>
                <button className="flex-1 py-1.5 text-xs rounded-lg border border-red-400/25 text-red-300 hover:bg-red-400/10 transition-all">
                  Clear Spam
                </button>
              </div>
            </SectionCard>

            {/* Drafts & Scheduled */}
            <SectionCard title="Drafts & Scheduled" icon="🔖">
              <p className="text-xs text-teal-400 uppercase tracking-wider mb-2">
                Drafts
              </p>
              <div className="space-y-2 mb-4">
                {drafts.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div>
                      <p className="text-sm text-white font-medium group-hover:text-teal-300 transition-colors truncate max-w-[200px]">
                        {d.title}
                      </p>
                      <p className="text-xs text-teal-400">
                        {d.wordCount} · {d.updated}
                      </p>
                    </div>
                    <span className="text-teal-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-teal-400 uppercase tracking-wider mb-2">
                Scheduled
              </p>
              <div className="space-y-2">
                {scheduled.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-cyan-400/10 border border-cyan-400/20 rounded-xl px-3 py-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center text-sm">
                      🗓
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium truncate max-w-[190px]">
                        {s.title}
                      </p>
                      <p className="text-xs text-cyan-300">
                        {s.date} · {s.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── Row 5: Activity Feed + Quick Actions ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notifications */}
            <SectionCard
              title="Activity Feed"
              icon="🔔"
              className="lg:col-span-2"
            >
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ background: "rgba(62,205,196,0.15)" }}
                    >
                      {n.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{n.text}</p>
                      <p className="text-xs text-teal-400">{n.time}</p>
                    </div>
                    <button className="text-xs text-teal-500 hover:text-teal-300 transition-colors shrink-0">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Quick Actions */}
            <SectionCard title="Quick Actions" icon="⚡">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "New Post", icon: "✍️", primary: true },
                  { label: "View Blog", icon: "🌐", primary: false },
                  { label: "Manage Comments", icon: "💬", primary: false },
                  { label: "Analytics", icon: "📊", primary: false },
                  { label: "Schedule Post", icon: "🗓️", primary: false },
                  { label: "Settings", icon: "⚙️", primary: false },
                ].map((action, i) => (
                  <button
                    key={i}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-xl py-4 text-xs font-semibold transition-all active:scale-95 ${
                      action.primary
                        ? "text-[#0c3f3f] col-span-2"
                        : "text-teal-100 hover:bg-white/15 border border-white/10 bg-white/5"
                    }`}
                    style={
                      action.primary
                        ? {
                            background:
                              "linear-gradient(135deg,#3ecdc4,#5ee8e0)",
                          }
                        : {}
                    }
                  >
                    <span className="text-xl">{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-teal-600">
            © 2026 Noted · All rights reserved
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

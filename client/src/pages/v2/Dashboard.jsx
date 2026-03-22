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
import {
  MdDashboard,
  MdArticle,
  MdComment,
  MdBarChart,
  MdSettings,
  MdPerson,
  MdAdd,
  MdNotifications,
  MdEdit,
  MdCheckCircle,
  MdSchedule,
  MdDeleteOutline,
  MdTrendingUp,
  MdVisibility,
  MdGroup,
  MdClose,
} from "react-icons/md";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaGlobe,
  FaPenAlt,
} from "react-icons/fa";
import { BsBookmarkFill, BsLightningFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  dark: "#0c3f3f",
  mid: "#117a7a",
  light: "#3ecdc4",
  lighter: "#5ee8e0",
  grad: "linear-gradient(135deg,#117a7a,#3ecdc4)",
  gradH: "linear-gradient(135deg,#0c3f3f,#117a7a)",
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const stats = [
  {
    label: "Total Posts",
    value: "128",
    icon: <MdArticle size={22} />,
    change: "+4 this week",
  },
  {
    label: "Total Views",
    value: "94.2K",
    icon: <MdVisibility size={22} />,
    change: "+12% vs last month",
  },
  {
    label: "Followers",
    value: "3,810",
    icon: <MdGroup size={22} />,
    change: "+230 this month",
  },
  {
    label: "Comments",
    value: "1,540",
    icon: <MdComment size={22} />,
    change: "+88 this week",
  },
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

const allPosts = [
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
  {
    title: "Deep Work in the Age of Distraction",
    status: "Published",
    views: 3100,
    date: "Mar 10, 2026",
  },
  {
    title: "How I Learned Spanish in 6 Months",
    status: "Draft",
    views: 0,
    date: "Mar 8, 2026",
  },
];

const allComments = [
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
    comment: "I've been doing tip #3 for a year 🙌",
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
  {
    author: "Sara Kim",
    post: "Deep Work in the Age…",
    comment: "Changed how I approach my mornings!",
    time: "2 days ago",
    avatar: "SK",
  },
  {
    author: "Ravi Patel",
    post: "Future of AI in Everyday Life",
    comment: "Really well researched post.",
    time: "2 days ago",
    avatar: "RP",
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
    text: "Priya Sharma started following you",
    time: "1h ago",
    icon: <MdGroup size={18} />,
  },
  {
    text: "New comment on 'Future of AI'",
    time: "2h ago",
    icon: <MdComment size={18} />,
  },
  {
    text: "Your post got 50 new likes",
    time: "4h ago",
    icon: <MdTrendingUp size={18} />,
  },
  {
    text: "James Liu mentioned you in a post",
    time: "6h ago",
    icon: <MdNotifications size={18} />,
  },
  {
    text: "You crossed 3,800 followers!",
    time: "Yesterday",
    icon: <MdGroup size={18} />,
  },
];

// ─── Shared Sub-components ────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const s = {
    Published: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    Draft: "bg-amber-50 text-amber-600 border border-amber-200",
    Scheduled: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  };
  return (
    <span
      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${s[status]}`}
    >
      {status}
    </span>
  );
};

const Card = ({ title, icon, children, className = "" }) => (
  <div
    className={`rounded-2xl bg-white border border-gray-100 shadow-sm p-5 ${className}`}
  >
    <h2
      className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
      style={{ color: T.mid }}
    >
      <span>{icon}</span>
      {title}
    </h2>
    {children}
  </div>
);

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 text-xs shadow-xl text-white"
      style={{ background: T.dark }}
    >
      <p className="font-semibold">{label}</p>
      <p style={{ color: T.light }}>{payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const AvatarCircle = ({ initials }) => (
  <div
    className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white"
    style={{ background: T.grad }}
  >
    {initials}
  </div>
);

// ─── Page: Dashboard ──────────────────────────────────────────────────────────
const PageDashboard = () => (
  <div className="space-y-6">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
            style={{ background: "linear-gradient(90deg,#117a7a,#3ecdc4)" }}
          />
          <div className="flex items-center justify-between mb-2 mt-1">
            <span style={{ color: T.mid }}>{s.icon}</span>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {s.change}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: T.dark }}>
            {s.value}
          </p>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Content Performance" icon={<MdBarChart size={14} />}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={viewsData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<ChartTip />}
              cursor={{ fill: "rgba(62,205,196,0.06)" }}
            />
            <Bar dataKey="views" radius={[6, 6, 0, 0]} fill="url(#barGrad)" />
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3ecdc4" />
                <stop offset="100%" stopColor="#117a7a" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Audience & Traffic" icon={<MdTrendingUp size={14} />}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTip />} />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#117a7a" />
                <stop offset="100%" stopColor="#3ecdc4" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="url(#lineGrad)"
              strokeWidth={3}
              dot={{ fill: "#3ecdc4", stroke: "#fff", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>

    {/* Posts + Tags */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card
        title="Recent Posts"
        icon={<MdArticle size={14} />}
        className="lg:col-span-2"
      >
        <div className="space-y-1">
          {allPosts.slice(0, 5).map((post, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 py-2.5 px-2 border-b border-gray-50 last:border-0 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {post.title}
                </p>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {post.views > 0 && (
                  <span className="text-xs text-gray-400">
                    {post.views.toLocaleString()} views
                  </span>
                )}
                <StatusBadge status={post.status} />
                <button
                  className="text-xs font-semibold hover:underline"
                  style={{ color: T.mid }}
                >
                  <MdEdit size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Tags & Categories" icon={<BsBookmarkFill size={12} />}>
        <div className="flex justify-center mb-3">
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
              {tagData.map((e, i) => (
                <Cell key={i} fill={e.color} stroke="transparent" />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="space-y-2">
          {tagData.map((tag, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: tag.color }}
                />
                <span className="text-gray-600">{tag.name}</span>
              </div>
              <span className="font-bold" style={{ color: T.mid }}>
                {tag.value}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Comments + Drafts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Recent Comments" icon={<MdComment size={14} />}>
        <div className="space-y-4">
          {allComments.slice(0, 4).map((c, i) => (
            <div key={i} className="flex gap-3">
              <AvatarCircle initials={c.avatar} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {c.author}
                  </p>
                  <span className="text-xs text-gray-400 shrink-0">
                    {c.time}
                  </span>
                </div>
                <p className="text-xs truncate" style={{ color: T.mid }}>
                  {c.post}
                </p>
                <p className="text-xs text-gray-500 italic mt-0.5">
                  "{c.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all font-medium">
            Approve All
          </button>
          <button className="flex-1 py-1.5 text-xs rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-all font-medium">
            Clear Spam
          </button>
        </div>
      </Card>

      <Card title="Drafts & Scheduled" icon={<BsBookmarkFill size={12} />}>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Drafts
        </p>
        <div className="space-y-2 mb-5">
          {drafts.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-gray-100 hover:border-[#3ecdc4] transition-all cursor-pointer group"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(62,205,196,0.04)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <div>
                <p className="text-sm text-gray-700 font-medium truncate max-w-[200px] group-hover:text-[#117a7a] transition-colors">
                  {d.title}
                </p>
                <p className="text-xs text-gray-400">
                  {d.wordCount} · {d.updated}
                </p>
              </div>
              <span
                className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: T.light }}
              >
                →
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Scheduled
        </p>
        <div className="space-y-2">
          {scheduled.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 border"
              style={{
                background: "rgba(62,205,196,0.06)",
                borderColor: "rgba(62,205,196,0.25)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(62,205,196,0.15)" }}
              >
                <MdSchedule size={16} style={{ color: T.mid }} />
              </div>
              <div>
                <p className="text-sm text-gray-800 font-medium truncate max-w-[180px]">
                  {s.title}
                </p>
                <p className="text-xs font-medium" style={{ color: T.mid }}>
                  {s.date} · {s.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Activity + Quick Actions */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card
        title="Activity Feed"
        icon={<MdNotifications size={14} />}
        className="lg:col-span-2"
      >
        <div className="space-y-1">
          {notifications.map((n, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 px-2 border-b border-gray-50 last:border-0 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(62,205,196,0.1)", color: T.mid }}
              >
                {n.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{n.text}</p>
                <p className="text-xs text-gray-400">{n.time}</p>
              </div>
              <button className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                <MdClose size={14} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Quick Actions" icon={<BsLightningFill size={12} />}>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "New Post", icon: <MdAdd size={20} />, primary: true },
            {
              label: "View Blog",
              icon: <MdVisibility size={18} />,
              primary: false,
            },
            {
              label: "Comments",
              icon: <MdComment size={18} />,
              primary: false,
            },
            {
              label: "Analytics",
              icon: <MdBarChart size={18} />,
              primary: false,
            },
            {
              label: "Schedule",
              icon: <MdSchedule size={18} />,
              primary: false,
            },
            {
              label: "Settings",
              icon: <MdSettings size={18} />,
              primary: false,
            },
          ].map((a, i) => (
            <button
              key={i}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl py-4 text-xs font-semibold transition-all active:scale-95 ${
                a.primary
                  ? "col-span-2 text-white shadow-md hover:opacity-90"
                  : "text-gray-600 border border-gray-100 bg-gray-50"
              }`}
              style={a.primary ? { background: T.grad } : {}}
              onMouseEnter={(e) => {
                if (!a.primary) {
                  e.currentTarget.style.borderColor = "#3ecdc4";
                  e.currentTarget.style.color = "#117a7a";
                  e.currentTarget.style.background = "rgba(62,205,196,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!a.primary) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.background = "";
                }
              }}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// ─── Page: Posts ──────────────────────────────────────────────────────────────
const PagePosts = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Published", "Draft", "Scheduled"];
  const filtered =
    filter === "All" ? allPosts : allPosts.filter((p) => p.status === filter);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: T.dark }}>
          All Posts
        </h2>
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md"
          style={{ background: T.grad }}
        >
          <MdAdd size={16} /> New Post
        </button>
      </div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${filter === f ? "text-white border-transparent" : "text-gray-500 border-gray-200 bg-white hover:border-[#3ecdc4] hover:text-[#117a7a]"}`}
            style={filter === f ? { background: T.grad } : {}}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.map((post, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${i !== filtered.length - 1 ? "border-b border-gray-50" : ""}`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(62,205,196,0.1)", color: T.mid }}
            >
              <MdArticle size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {post.title}
              </p>
              <p className="text-xs text-gray-400">
                {post.date}
                {post.views > 0 && ` · ${post.views.toLocaleString()} views`}
              </p>
            </div>
            <StatusBadge status={post.status} />
            <div className="flex gap-2 shrink-0">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#117a7a] transition-colors">
                <MdEdit size={16} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-400 transition-colors">
                <MdDeleteOutline size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Page: Comments ───────────────────────────────────────────────────────────
const PageComments = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold" style={{ color: T.dark }}>
        Comments
      </h2>
      <div className="flex gap-2">
        <button className="px-4 py-1.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">
          Approve All
        </button>
        <button className="px-4 py-1.5 rounded-xl text-sm font-medium border border-red-100 text-red-400 hover:bg-red-50 transition-all">
          Clear Spam
        </button>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {allComments.map((c, i) => (
        <div
          key={i}
          className={`flex gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${i !== allComments.length - 1 ? "border-b border-gray-50" : ""}`}
        >
          <AvatarCircle initials={c.avatar} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <p className="text-sm font-semibold text-gray-800">{c.author}</p>
              <span className="text-xs text-gray-400 shrink-0">{c.time}</span>
            </div>
            <p className="text-xs font-medium mb-1" style={{ color: T.mid }}>
              {c.post}
            </p>
            <p className="text-sm text-gray-600 italic">"{c.comment}"</p>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-300 hover:text-emerald-500 transition-colors">
              <MdCheckCircle size={16} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
              <MdDeleteOutline size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Page: Analytics ──────────────────────────────────────────────────────────
const PageAnalytics = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold" style={{ color: T.dark }}>
      Analytics
    </h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          label: "Page Views",
          value: "94.2K",
          change: "+12%",
          icon: <MdVisibility size={22} />,
        },
        {
          label: "Avg. Read Time",
          value: "4m 32s",
          change: "+0.5m",
          icon: <MdSchedule size={22} />,
        },
        {
          label: "Bounce Rate",
          value: "38%",
          change: "-3%",
          icon: <MdTrendingUp size={22} />,
        },
        {
          label: "New Readers",
          value: "1,230",
          change: "+18%",
          icon: <MdGroup size={22} />,
        },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
            style={{ background: "linear-gradient(90deg,#117a7a,#3ecdc4)" }}
          />
          <div className="flex items-center justify-between mb-2 mt-1">
            <span style={{ color: T.mid }}>{s.icon}</span>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {s.change}
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: T.dark }}>
            {s.value}
          </p>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Monthly Views" icon={<MdBarChart size={14} />}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={viewsData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<ChartTip />}
              cursor={{ fill: "rgba(62,205,196,0.06)" }}
            />
            <Bar dataKey="views" radius={[6, 6, 0, 0]} fill="url(#barGrad2)" />
            <defs>
              <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3ecdc4" />
                <stop offset="100%" stopColor="#117a7a" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Daily Visitors" icon={<MdTrendingUp size={14} />}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTip />} />
            <defs>
              <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#117a7a" />
                <stop offset="100%" stopColor="#3ecdc4" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="url(#lineGrad2)"
              strokeWidth={3}
              dot={{ fill: "#3ecdc4", stroke: "#fff", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card title="Top Posts by Views" icon={<MdArticle size={14} />}>
      <div className="space-y-3">
        {allPosts
          .filter((p) => p.views > 0)
          .sort((a, b) => b.views - a.views)
          .map((post, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="text-sm font-bold w-5 shrink-0"
                style={{ color: T.light }}
              >
                #{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 font-medium truncate">
                  {post.title}
                </p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.round((post.views / 9100) * 100)}%`,
                      background: T.grad,
                    }}
                  />
                </div>
              </div>
              <span
                className="text-sm font-bold shrink-0"
                style={{ color: T.mid }}
              >
                {post.views.toLocaleString()}
              </span>
            </div>
          ))}
      </div>
    </Card>
  </div>
);

// ─── Page: Settings ───────────────────────────────────────────────────────────
const PageSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifs: true,
    commentNotifs: true,
    weeklyDigest: false,
    publicProfile: true,
    showFollowers: true,
  });
  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));
  const Toggle = ({ k, label, desc }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => toggle(k)}
        className={`w-11 h-6 rounded-full transition-all relative ${settings[k] ? "" : "bg-gray-200"}`}
        style={settings[k] ? { background: T.grad } : {}}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings[k] ? "left-5" : "left-0.5"}`}
        />
      </button>
    </div>
  );
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold" style={{ color: T.dark }}>
        Settings
      </h2>
      <Card title="Notifications" icon={<MdNotifications size={14} />}>
        <Toggle
          k="emailNotifs"
          label="Email Notifications"
          desc="Receive updates via email"
        />
        <Toggle
          k="commentNotifs"
          label="Comment Alerts"
          desc="Get notified on new comments"
        />
        <Toggle
          k="weeklyDigest"
          label="Weekly Digest"
          desc="A summary of your week"
        />
      </Card>
      <Card title="Privacy" icon={<MdSettings size={14} />}>
        <Toggle
          k="publicProfile"
          label="Public Profile"
          desc="Allow others to find your profile"
        />
        <Toggle k="showFollowers" label="Show Follower Count" />
      </Card>
      <Card title="Danger Zone" icon={<MdDeleteOutline size={14} />}>
        <p className="text-xs text-gray-500 mb-4">
          These actions are permanent and cannot be undone.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-xl text-sm font-medium border border-amber-200 text-amber-600 hover:bg-amber-50 transition-all">
            Export Data
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all">
            Delete Account
          </button>
        </div>
      </Card>
    </div>
  );
};

// ─── Page: Profile ────────────────────────────────────────────────────────────
const PageProfile = () => {
  const [profile, setProfile] = useState({
    name: "Soumya Dev",
    username: "soumyadev",
    email: "soumya@noted.app",
    bio: "Writer, thinker, and lover of minimalist design. I write about technology, lifestyle, and the future of work.",
    location: "Bhubaneswar, India",
    website: "https://soumyadev.noted.app",
    twitter: "soumyadev",
    instagram: "soumya.dev",
    linkedin: "soumyadev",
    github: "soumyadev",
    youtube: "",
  });
  const [saved, setSaved] = useState(false);
  const Field = ({ label, field, placeholder, type = "text" }) => (
    <div>
      <label
        className="block text-xs font-bold uppercase tracking-wider mb-1.5"
        style={{ color: T.mid }}
      >
        {label}
      </label>
      <input
        type={type}
        value={profile[field]}
        placeholder={placeholder}
        onChange={(e) => setProfile((p) => ({ ...p, [field]: e.target.value }))}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none transition-all bg-white"
        onFocus={(e) => {
          e.target.style.borderColor = "#3ecdc4";
          e.target.style.boxShadow = "0 0 0 3px rgba(62,205,196,0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "";
          e.target.style.boxShadow = "";
        }}
      />
    </div>
  );
  const SocialField = ({ label, field, icon, placeholder }) => (
    <div>
      <label
        className="block text-xs font-bold uppercase tracking-wider mb-1.5"
        style={{ color: T.mid }}
      >
        {label}
      </label>
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#3ecdc4] focus-within:shadow-[0_0_0_3px_rgba(62,205,196,0.1)] transition-all bg-white">
        <span className="px-3 py-2.5 text-gray-400 border-r border-gray-100 shrink-0">
          {icon}
        </span>
        <input
          type="text"
          value={profile[field]}
          placeholder={placeholder}
          onChange={(e) =>
            setProfile((p) => ({ ...p, [field]: e.target.value }))
          }
          className="flex-1 px-3 py-2.5 text-sm text-gray-800 focus:outline-none bg-transparent"
        />
      </div>
    </div>
  );
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold" style={{ color: T.dark }}>
        Edit Profile
      </h2>

      {/* Avatar */}
      <Card title="Profile Picture" icon={<MdPerson size={14} />}>
        <div className="flex items-center gap-5">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
            style={{ background: T.grad }}
          >
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <button
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md mr-2"
              style={{ background: T.grad }}
            >
              Upload Photo
            </button>
            <button className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">
              Remove
            </button>
            <p className="text-xs text-gray-400 mt-2">
              JPG, PNG up to 2MB. Recommended: 400×400px.
            </p>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card title="Basic Information" icon={<MdPerson size={14} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" field="name" placeholder="Your name" />
          <Field label="Username" field="username" placeholder="@username" />
          <Field
            label="Email"
            field="email"
            type="email"
            placeholder="you@example.com"
          />
          <Field
            label="Location"
            field="location"
            placeholder="City, Country"
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-xs font-bold uppercase tracking-wider mb-1.5"
            style={{ color: T.mid }}
          >
            Bio
          </label>
          <textarea
            value={profile.bio}
            rows={3}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none resize-none transition-all"
            onFocus={(e) => {
              e.target.style.borderColor = "#3ecdc4";
              e.target.style.boxShadow = "0 0 0 3px rgba(62,205,196,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "";
              e.target.style.boxShadow = "";
            }}
          />
        </div>
        <div className="mt-4">
          <Field
            label="Website"
            field="website"
            placeholder="https://yoursite.com"
          />
        </div>
      </Card>

      {/* Social Links */}
      <Card title="Social Media Links" icon={<FaGlobe size={12} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SocialField
            label="Twitter / X"
            field="twitter"
            icon={<FaTwitter size={14} style={{ color: "#1DA1F2" }} />}
            placeholder="username"
          />
          <SocialField
            label="Instagram"
            field="instagram"
            icon={<FaInstagram size={14} style={{ color: "#E1306C" }} />}
            placeholder="username"
          />
          <SocialField
            label="LinkedIn"
            field="linkedin"
            icon={<FaLinkedin size={14} style={{ color: "#0A66C2" }} />}
            placeholder="username"
          />
          <SocialField
            label="GitHub"
            field="github"
            icon={<FaGithub size={14} style={{ color: "#333" }} />}
            placeholder="username"
          />
          <SocialField
            label="YouTube"
            field="youtube"
            icon={<FaYoutube size={14} style={{ color: "#FF0000" }} />}
            placeholder="channel"
          />
          <SocialField
            label="Website"
            field="website"
            icon={<FaGlobe size={14} style={{ color: T.mid }} />}
            placeholder="https://..."
          />
        </div>
      </Card>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
          style={{ background: T.grad }}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
        <button className="px-6 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all">
          Cancel
        </button>
        {saved && (
          <span className="text-sm text-emerald-500 font-medium">
            Profile updated successfully.
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard", icon: <MdDashboard size={18} /> },
    { label: "Posts", icon: <MdArticle size={18} /> },
    { label: "Comments", icon: <MdComment size={18} /> },
    { label: "Analytics", icon: <MdBarChart size={18} /> },
    { label: "Settings", icon: <MdSettings size={18} /> },
    { label: "Profile", icon: <MdPerson size={18} /> },
  ];

  const pageMap = {
    Dashboard: <PageDashboard />,
    Posts: <PagePosts />,
    Comments: <PageComments />,
    Analytics: <PageAnalytics />,
    Settings: <PageSettings />,
    Profile: <PageProfile />,
  };

  return (
    <div
      className="flex h-screen overflow-hidden bg-gray-50"
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      {/* ── Fixed Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-60 h-screen border-r border-white/10 px-4 py-8 flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, #0c3f3f 0%, #117a7a 50%, #3ecdc4 100%)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 px-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg,#3ecdc4,#117a7a)" }}
          >
            <FaPenAlt />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Noted
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active === label
                  ? "bg-white/15 text-white shadow-inner"
                  : "text-teal-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={active === label ? "text-white" : "text-teal-200"}
              >
                {icon}
              </span>
              {label}
            </button>
          ))}
        </nav>

        {/* Profile pill */}
        <div className="mt-auto">
          {/* <button className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-teal-200 hover:bg-white/10 hover:text-white transition-all">
            Log Out
          </button> */}

          <button className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 bg-white/15 text-white shadow-inner text-teal-200 hover:bg-white/10 hover:text-white">
            <span className={"hover:text-white text-teal-200"}>
              <HiOutlineLogout />
            </span>
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Scrollable Main Content ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-xs text-gray-400">Sunday, March 22, 2026</p>
            {/* <h1
              className="text-xl font-bold leading-tight"
              style={{ color: T.dark }}
            >
              {active}
            </h1> */}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#3ecdc4] transition-colors">
              <MdNotifications size={18} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: T.light }}
              />
            </button>
            <button
              onClick={() => setActive("Posts")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
              style={{ background: T.grad }}
            >
              <MdAdd size={16} /> New Post
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {pageMap[active]}
          <p className="mt-10 text-center text-xs text-gray-300 pb-4">
            © 2026 Noted · All rights reserved
          </p>
        </main>
      </div>
    </div>
  );
}

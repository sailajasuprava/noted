import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useBlog } from "../../context/BlogContext";
import Spinner from "../../components/Spinner";
import BlogCard from "../../components/v2/BlogCard";
import { useEffect } from "react";

const Home = () => {
  const [page, setPage] = useState(1);
  const {
    blogs,
    fetchAllBlogs,
    hasMore,
    search,
    setSearch,
    categories,
    activeCategory,
    setActiveCategory,
  } = useBlog();

  useEffect(() => {
    fetchAllBlogs(page);
  }, [page]);

  useEffect(() => {
    if (search === "") {
      fetchAllBlogs(1, "");
      setPage(1);
    }
  }, [search]);

  const totalPages = hasMore ? page + 1 : page;
  if (!blogs.length) return <Spinner />;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- ALL ARTICLES SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white">
        {/* --- HEADER --- */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Blog</h2>
          <p className="text-gray-600 text-base max-w-2xl">
            Here, we share travel tips, destination guides, and stories that
            inspire your next adventure.
          </p>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 border-b border-gray-200 pb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveCategory("all");
                setPage(1);
                fetchAllBlogs(1, search, "all");
              }}
              className={`px-5 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                activeCategory === "all"
                  ? "bg-gray-100 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setActiveCategory(cat._id);
                  setPage(1);
                  fetchAllBlogs(1, search, cat._id);
                }}
                className={`px-5 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                  activeCategory === cat._id
                    ? "bg-gray-100 text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {cat.categoryName}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  fetchAllBlogs(1, search);
                }
              }}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none ring-1 focus:ring-2 ring-gray-300 transition"
            />

            <FiSearch className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* --- ARTICLE GRID --- */}
        <section className="max-w-6xl mx-auto px-6 pb-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* --- PAGINATION --- */}
          <div className="mt-20 flex justify-center items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {Array.from(
              { length: hasMore ? page + 1 : page },
              (_, i) => i + 1,
            ).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-12 h-12 flex items-center justify-center font-black text-sm transition-all border-2 ${
                  n === page
                    ? "bg-black text-white border-black"
                    : "bg-white text-slate-400 border-slate-100 hover:border-black hover:text-black"
                }`}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}
            <button
              disabled={!hasMore}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;

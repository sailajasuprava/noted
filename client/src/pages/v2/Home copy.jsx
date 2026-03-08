import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useCategory } from "../../context/CategoryContext";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("business");
  const { categories } = useCategory();

  const blogs = [
    {
      id: 1,
      category: "Destination",
      title: "Unveiling the Secrets Beyond the Tourist Trails",
      content:
        "Dive into the local culture, discover hidden spots, and experience the authentic charm that often Dive into the local culture, discover hidden spots, and experience the authentic charm that oftenDive into the local culture, discover hidden spots, and experience the authentic charm that oftenDive into the local culture, discover hidden spots, and experience the authentic charm that often Dive into the local culture, discover hidden spots, and experience the authentic charm that oftenDive into the local culture, discover hidden spots, and experience the authentic charm that oftenDive into the local culture, discover hidden spots, and experience the authentic charm that often",
      createdAt: "30 Jan 2024",
      readTime: "10 mins read",
      author: {
        fullname: "Seraphina Isabella",
        avatar: "https://i.pravatar.cc/150?u=seraphina",
      },
      banner:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      category: "Lifestyle",
      title: "A Fashionista's Guide to Wanderlust",
      content:
        "Explore the intersection of fashion and travel as we delve into the wardrobes of globetrotters. Fr...",
      createdAt: "29 Jan 2024",
      readTime: "5 mins read",
      author: {
        fullname: "Maximilian Bartholomew",
        avatar: "https://i.pravatar.cc/150?u=max",
      },
      banner:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      category: "Tips & Hacks",
      title: "Top 5 Apps and Gadgets That Will Transform Your Journeys",
      content:
        "Explore the latest in travel technology with our guide to must-have apps and gadgets. From nav...",
      createdAt: "26 Jan 2024",
      readTime: "15 mins read",
      author: {
        fullname: "Anastasia Evangeline",
        avatar: "https://i.pravatar.cc/150?u=ana",
      },
      banner:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      category: "Adventure",
      title: "Chasing Sunsets Across the Sahara",
      content:
        "Experience the magic of endless dunes, golden horizons, and star-lit desert nights in this breathtaking adventure...",
      createdAt: "24 Jan 2024",
      readTime: "8 mins read",
      author: {
        fullname: "Orion Alexander",
        avatar: "https://i.pravatar.cc/150?u=orion",
      },
      banner:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      category: "Food & Culture",
      title: "A Culinary Journey Through Coastal Italy",
      content:
        "From fresh seafood delicacies to handmade pasta traditions, discover flavors that define Italy’s seaside towns...",
      createdAt: "22 Jan 2024",
      readTime: "12 mins read",
      author: {
        fullname: "Valentina Rousseau",
        avatar: "https://i.pravatar.cc/150?u=valentina",
      },
      banner:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      category: "Wellness",
      title: "Finding Balance in the Mountains of Bali",
      content:
        "Reconnect with nature and yourself through yoga retreats, tranquil waterfalls, and mindful escapes...",
      createdAt: "20 Jan 2024",
      readTime: "6 mins read",
      author: {
        fullname: "Elijah Montgomery",
        avatar: "https://i.pravatar.cc/150?u=elijah",
      },
      banner:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 7,
      category: "City Guides",
      title: "48 Hours in Tokyo: Neon Lights & Hidden Alleys",
      content:
        "Navigate Tokyo like a local with our curated weekend itinerary covering street food, skyline views, and quiet shrines...",
      createdAt: "18 Jan 2024",
      readTime: "9 mins read",
      author: {
        fullname: "Haruto Sinclair",
        avatar: "https://i.pravatar.cc/150?u=haruto",
      },
      banner:
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 8,
      category: "Sustainable Travel",
      title: "Eco-Friendly Escapes for the Conscious Explorer",
      content:
        "Learn how to minimize your carbon footprint while maximizing unforgettable experiences around the globe...",
      createdAt: "16 Jan 2024",
      readTime: "7 mins read",
      author: {
        fullname: "Isadora Bennett",
        avatar: "https://i.pravatar.cc/150?u=isadora",
      },
      banner:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800",
    },
  ];

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
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat.categoryName)}
                className={`px-5 py-2 rounded-md text-xs font-semibold uppercase transition-all ${
                  activeCategory === cat.categoryName
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
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none ring-1 focus:ring-2 ring-gray-300 transition"
            />

            <FiSearch className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* --- ARTICLE GRID --- */}
        <section className="max-w-6xl mx-auto px-6 pb-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {blogs.map((blog) => (
              <div key={blog.id} className="group cursor-pointer flex flex-col">
                {/* Image Wrap with Floating Arrow */}
                <div className="relative mb-6">
                  <div className="aspect-[1.5/1] overflow-hidden">
                    <img
                      src={blog.banner}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Floating Action Button - Matches the Black/Orange square in screenshot */}
                  {/* <div className="absolute -bottom-4 -right-0 w-12 h-12 bg-black text-white flex items-center justify-center transition-colors duration-300">
                    <MdArrowOutward size={24} />
                  </div> */}
                </div>

                {/* Content Wrap */}
                <div className="flex flex-col">
                  {/* Category with Dash - Matches the screenshot style */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-[2px] w-8 bg-slate-800"></div>
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>

                  {/* Title - Bold, Uppercase, and Compact */}
                  <h3 className="font-black text-xl text-slate-900 mb-4 leading-[1.2] uppercase tracking-tight group-hover:text-teal-500 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">
                    {blog.content}
                  </p>

                  {/* Bottom Metadata - Matches the icon layout in screenshot */}
                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.fullname}
                      className="w-10 h-10 rounded-full object-cover grayscale"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-sm">
                        {blog.author.fullname}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 text-xs mt-0.5">
                        <span>{blog.createdAt}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- PAGINATION --- */}
          <div className="mt-20 flex justify-center items-center gap-3">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-12 h-12 flex items-center justify-center font-black text-sm transition-all border-2 ${
                  n === 1
                    ? "bg-black text-white border-black"
                    : "bg-white text-slate-400 border-slate-100 hover:border-black hover:text-black"
                }`}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;

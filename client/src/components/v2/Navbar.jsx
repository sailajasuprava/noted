import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useAuth } from "../../context/AuthContext";
import { FaPenAlt, FaChevronDown } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineLogout } from "react-icons/hi";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [path, setPath] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { isLoading, handleLogout } = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setPath(location.pathname);
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location.pathname]);

  return (
    <section className="relative bg-gradient-to-br from-[#0c3f3f] via-[#117a7a] to-[#3ecdc4] text-white">
      <nav className="relative z-10 max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 md:grid-cols-3  items-center">
        <div className="justify-self-start flex items-center gap-2 text-2xl font-bold italic">
          <span className="bg-white text-[#0c3f3f] px-1.5 py-1 rounded">
            <FaPenAlt />
          </span>
          Noted
        </div>

        <div className="justify-self-center hidden md:flex gap-4 items-center text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`transition px-4 py-1.5 rounded-full uppercase ${
                location.pathname === item.path
                  ? "bg-white/20 text-white"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="justify-self-end flex items-center gap-4">
          {auth ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 group p-1 pr-2 rounded-full hover:bg-white/10 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 group-hover:border-white/60 transition">
                  {/* <FaUserCircle size={24} /> */}
                  <img
                    src={auth.avatar}
                    alt={auth.fullname}
                    className="w-10 h-10 rounded-full object-cover grayscale"
                  />
                </div>
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Modern White Dropdown */}
              {dropdownOpen && (
                <div className="absolute z-50 right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                  {/* User Info Header */}
                  <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-[#0c3f3f] font-bold text-base truncate">
                      {auth.fullname}
                    </p>
                    <p className="text-gray-500 text-xs truncate mt-0.5 font-medium">
                      {auth.email || "user@example.com"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      to="/write"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-[#3ecdc4]/10 hover:text-[#0c3f3f] transition-colors group"
                    >
                      <HiOutlinePencilAlt
                        size={20}
                        className="text-gray-400 group-hover:text-[#0c3f3f]"
                      />
                      <span className="font-semibold text-sm">Write Blog</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors group"
                    >
                      <HiOutlineLogout
                        size={20}
                        className="text-red-400 group-hover:text-red-500"
                      />
                      <span className="font-semibold text-sm">Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <NavLink to="/login">
                <button className="px-5 py-2 rounded-full text-sm font-semibold border border-white/70 hover:bg-white/10 transition">
                  Log in
                </button>
              </NavLink>

              <NavLink to="/signup">
                <button className="bg-white text-[#0c3f3f] px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {path === "/" && (
        <div className="relative z-0 max-w-4xl mx-auto text-center pt-24 pb-32 px-6">
          <h1 className="text-6xl uppercase font-bold mb-8 tracking-tight">
            Tell Your Story To Everyone
          </h1>

          <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            A platform designed to help you express your ideas, share
            experiences, and inspire others. Create, read, listen, and engage
            with stories from around the world for a{" "}
            <span className="font-semibold opacity-100">
              truly personalized
            </span>{" "}
            reading experience.
          </p>
        </div>
      )}
    </section>
  );
}

export default Navbar;

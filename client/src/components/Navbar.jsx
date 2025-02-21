import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

function Navbar() {
  const { auth } = useAuth();
  const { isLoading, handleLogout } = useLogout();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between bg-white w-screen px-8 py-2 fixed z-[10]">
      <Link to="/">
        <div className="font-serif font-bold text-3xl flex gap-1">
          Noted.
          <span>
            <FaPenAlt />
          </span>
        </div>
      </Link>

      <div className="relative">
        <input
          type="text"
          placeholder="search"
          className="px-4 pt-1 pb-2 border-2 border-gray-300 rounded-full"
        />
        <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
      </div>

      <ul className={`${showMenu ? "nav-mobile" : "nav-desk"}`}>
        {auth ? (
          <div className="relative">
            <button
              className="flex items-center bg-gray-200 p-2 pr-4 rounded-md"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>
                <RiArrowDropDownLine size={30} />
              </span>
              <span>Hi, {auth.fullname}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <Link to="/write">
                  <li className="block px-4 py-2 hover:bg-gray-100">Write</li>
                </Link>
                <Link to="/profile">
                  <li className="block px-4 py-2 hover:bg-gray-100">Profile</li>
                </Link>
                <button
                  className="btn-black w-full rounded-none"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/signup">
              <li className="btn-black">Signup</li>
            </NavLink>
            <NavLink to="/login">
              <li className="btn-white">Login</li>
            </NavLink>
          </>
        )}
      </ul>
      <button
        className="sm:hidden"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <GiHamburgerMenu size={30} />
      </button>
    </header>
  );
}

export default Navbar;

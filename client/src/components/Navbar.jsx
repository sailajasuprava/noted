import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

function Navbar() {
  const { auth } = useAuth();
  const { isLoading, handleLogout } = useLogout();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex justify-between w-screen bg-white px-8 py-2 fixed z-[10]">
      <Link to="/">
        <div className="font-serif font-bold text-3xl flex gap-2">
          Noted
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
          <button
            className="btn-black"
            onClick={handleLogout}
            disabled={isLoading}
          >
            Log out
          </button>
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

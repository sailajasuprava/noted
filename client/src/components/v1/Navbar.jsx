import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import { useEffect, useState } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";
import { CiEdit, CiLogout } from "react-icons/ci";
import FilterChipBar from "../FilterChipBar";
import { IoIosSunny } from "react-icons/io";
import { LuMoonStar } from "react-icons/lu";
import Logo from "../Logo";
import SearchInput from "../SearchInput";

function Navbar() {
  const { auth } = useAuth();
  const { isLoading, handleLogout } = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [isDarkMode]);

  return (
    <header className="fixed z-10 bg-black text-white w-screen px-4 sm:px-8 py-4 ">
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <Logo />

        <SearchInput />

        <ul className="flex items-center gap-2">
          <button onClick={() => setIsDarkMode((prev) => !prev)}>
            {isDarkMode ? <IoIosSunny size={22} /> : <LuMoonStar size={20} />}
          </button>

          {auth ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center bg-gray-800 p-1 pr-4 rounded-md"
              >
                <span>
                  <RiArrowDropDownLine size={30} />
                </span>

                <span>Hi, {auth.fullname}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 z-[12] bg-black shadow-lg rounded-lg ">
                  <Link to="/write">
                    <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 ">
                      <span>
                        <CiEdit size={22} className="font-thin" />
                      </span>
                      <span>Write</span>
                    </li>
                  </Link>

                  <button
                    className="px-4 py-2 w-full flex items-center gap-2 hover:bg-gray-800"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    <span>
                      <CiLogout size={22} />
                    </span>
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/signup">
                <li className="btn-trans">Signup</li>
              </NavLink>
              <NavLink to="/login">
                <li className="btn-sm">Login</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <FilterChipBar />
    </header>
  );
}

export default Navbar;

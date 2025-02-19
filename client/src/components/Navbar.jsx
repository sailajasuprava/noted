import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function Navbar() {
  const { auth } = useAuth();
  const { isLoading, handleLogout } = useLogout();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex justify-between w-screen border bg-white px-8 py-2 fixed z-[10]">
      <div>
        <span className="font-serif text-lg leading-1 tracking-widest text-[#1E5631]">
          Paradise
        </span>
        <br />
        <span className="font-serif text-2xl leading-1 text-[#5C4033]">
          Palms🌴
        </span>
      </div>
      <ul className={`${showMenu ? "nav-mobile" : "nav-desk"}`}>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>

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
              <li>Signup</li>
            </NavLink>
            <NavLink to="/login">
              <li>Login</li>
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      setSearchInput("");
      navigate(`/search?q=${searchInput}`);
    }
  }

  return (
    <div className="relative order-2 sm:order-[0] w-full sm:w-auto">
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-4 pt-1 pb-2 border-2 border-gray-300 rounded-full w-full sm:w-auto"
      />
      <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}

export default SearchInput;

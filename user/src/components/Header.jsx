import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-white mx-auto items-center">
      <div className="flex justify-between items-center py-5 max-w-6xl mx-auto">
        <Link
          to="/"
          className="flex gap-1 font-nunito font-extrabold text-green-600 text-lg sm:text-2xl hover:scale-105 duration-500"
        >
          FurryFriends
          <img src="header-logo.png" className="h-[30px] w-[30px]" />
        </Link>

        <form
          className="flex items-center p-3 border border-green-600 rounded-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search "
            className="w-24 sm:w-64 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>
            <FaSearch className="text-green-600"></FaSearch>
          </button>
        </form>

        <div className="flex gap-3 items-center text-green-600 font-semibold">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={currentUser.ava}
                alt=""
              />
            ) : (
              <p className="hover:underline">Sign In</p>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

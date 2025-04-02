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
    <header className="bg-rose-400 mx-auto items-center">
      <div className="flex justify-between items-center p-5 max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="text-rose-50 font-bold text-sm sm:text-xl">
            <a>FurryFriends</a>
          </h1>
        </Link>

        <ul className="text-rose-50 flex gap-6">
          <Link to="/">
            <li className="hover:underline hidden sm:inline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:underline hidden sm:inline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={currentUser.ava}
                alt=""
              />
            ) : (
              <li className="hover:underline">Sign In</li>
            )}
          </Link>
        </ul>

        <form
          className="bg-rose-50 flex items-center p-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search "
            className="text-rose-400 bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>
            <FaSearch className="text-rose-400"></FaSearch>
          </button>
        </form>
      </div>
    </header>
  );
}

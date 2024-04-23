import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import webLogo from "../assets/movielogo.svg";

const links = [
  { name: "Login", path: "/Login" },
  { name: "Register", path: "/Register" },
];

function AppNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/ClotheSearch/${searchQuery}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="rounded-md mb-2">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={webLogo} className="h-8" alt="Web Logo" />
          <span className="self-center text-2xl font-semibold text-gray-200 whitespace-nowrap">ClotheHub</span>
        </Link>

        <div className="relative text-gray-600 focus-within:text-gray-400 mb-4 md:mb-0">
          <input
            type="text"
            className="py-2 px-3 border-b-2 border-gray-300 focus:outline-none focus:border-red-900 text-sm rounded-full text-center"
            placeholder="Buscar película..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="p-2 bg-grey mt-1 mr-2 text-red-700"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>

        <div className="flex" id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink key={index} to={link.path} className={({ isActive }) =>
                  isActive ? 'py-2 px-3 text-red-700 rounded' : 'py-2 px-3 text-white rounded hover:text-red-900'
                }>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;

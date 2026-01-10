import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { Search, Bell, Menu } from "lucide-react";
import { useState } from "react";

const TopBar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const settings = { path: "/app/profile", name: "Settings" };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        navigate(`/app/notes?search=${query}`);
      } else {
        navigate(`/app/notes`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-20 px-6 border-b border-gray-200/20 backdrop-blur-lg bg-white/30">
      {/* 1. LEFT SIDE: Logo & Menu */}
      <div className="flex items-center gap-4 w-60">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <h1 className="hidden text-xl font-bold text-gray-800 sm:block">
            Smart<span className="text-blue-600">Notes</span>
          </h1>
        </div>
      </div>

      <div className="justify-center flex-1 hidden px-6 md:flex">
        <div className="relative w-full max-w-lg">
          <Search
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
            size={20}
          />
          <input
            type="text"
            placeholder="Search your notes..."
            className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-gray-700 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* 3. RIGHT SIDE: Icons & Profile */}
      <div className="flex items-center justify-end gap-6 w-60">
        {/* Icons */}
        <button className="relative p-2 text-gray-400 hover:text-blue-500">
          <Bell size={22} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Profile */}
        <div
          className="flex items-center justify-center w-10 h-10 font-bold text-blue-600 bg-blue-100 border-2 border-white rounded-full shadow-sm cursor-pointer"
          onClick={() => navigate(settings.path)}
        >
          {user?.data?.email?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default TopBar;

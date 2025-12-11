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
    <header className="fixed top-0 left-0 w-full h-20 border-b border-gray-200/20 backdrop-blur-lg bg-white/30 px-6 flex items-center justify-between z-50">
      {/* 1. LEFT SIDE: Logo & Menu */}
      <div className="flex items-center gap-4 w-60"> 
        <button onClick={onMenuClick} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
            Smart<span className="text-blue-600">Notes</span>
            </h1>
        </div>
      </div>

      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
          className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm cursor-pointer"
          onClick={() => navigate(settings.path)}
        >
          {user?.data?.email?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default TopBar;

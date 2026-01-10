import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Settings,
  LogOut,
  Trash,
} from "lucide-react";
import { useAuth } from "../Context/authContext";
import { logOut } from "../services/auth";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, logoutUser } = useAuth();

  const menuItems = [
    { path: "/app/dashboard", name: "Overview", icon: LayoutDashboard },
    { path: "/app/notes", name: "My Notes", icon: FileText },
    { path: "/app/notes/new", name: "Create Note", icon: PlusCircle },
    { path: "/app/trash", name: "Trash Bin", icon: Trash },
    { path: "/app/profile", name: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logoutUser(); 
    navigate("/auth/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 fixed left-0 top-20 h-[calc(100vh-5rem)] z-40 overflow-y-auto">
      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <item.icon
                size={20}
                className={isActive ? "text-blue-600" : "text-gray-400"}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 font-medium text-red-500 transition-colors rounded-xl hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

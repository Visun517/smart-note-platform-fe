import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { Search, Bell, Menu} from 'lucide-react';


const TopBar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user)

  const settings = { path: "/app/profile", name: "Settings" };
  

  return (
    <header className="fixed top-0 left-0 w-full h-20 border-b border-gray-200/20 backdrop-blur-lg bg-white/30 px-6 flex items-center justify-between z-50">
      
      {/* Left Side: Logo & Menu Button */}
      <div className="flex items-center gap-4">
        
        {/* Mobile Menu Button */}
        <button onClick={onMenuClick} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2 mr-8">
            <span className="text-2xl">🎓</span>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
            Smart<span className="text-blue-600">Notes</span>
            </h1>
        </div>
      </div>

      {/* Right Side: Search & Profile */}
      <div className="flex items-center gap-6">
        
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100 focus-within:ring-2 focus-within:ring-blue-50 transition-all mr-40 lg:w-200">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-2 text-sm text-gray-700 w-32 lg:w-48" />
          </div>

        {/* Icons */}
        <button className="relative p-2 text-gray-400 hover:text-blue-500">
          <Bell size={22} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Profile */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm cursor-pointer" onClick={ () =>  navigate(settings.path)}>
            {user?.data?.email?.charAt(0).toUpperCase() || 'U'}
        </div>

      </div>
    </header>
  );
};

export default TopBar;
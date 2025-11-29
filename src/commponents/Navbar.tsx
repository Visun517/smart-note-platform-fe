import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
function Navbar() {

  const navigate = useNavigate();

  return (
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-50 shadow-sm transition-all duration-300">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-24"> 
          
          {/* --- 1. Logo Section --- */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img 
              src={logo} 
              alt="SmartNotes AI Logo" 
              className="h-20 w-auto object-contain" 
            />
            {/* Brand Name: Dark Gray & Light Blue */}
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Smart<span className="text-blue-500">Notes</span>
            </h1>
          </div>


          {/* --- 3. Right Side Actions --- */}
          <div className="flex items-center gap-8">
        
            {/* Login Link (Simple Dark Text) */}
            <button className="text-gray-800 font-bold hover:text-blue-500 transition-colors" onClick={() => navigate('/auth/login')}>
              Login
            </button>

            {/* GET STARTED Button (Light Blue & Pill Shape) */}
            <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:shadow-blue-300 transform active:scale-95 transition-all duration-200" onClick={() => navigate('/auth/signup')}>
              Get Started
            </button>
            
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

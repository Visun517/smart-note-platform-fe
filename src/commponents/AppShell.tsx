import  { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../commponents/SideBar';
import TopBar from '../commponents/TopBar';

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      
      <TopBar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <SideBar />

      <div className="pt-20 md:ml-64 min-h-screen transition-all duration-300">
        
        <main className="p-6 md:p-8">
          <Outlet />
        </main>

      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl pt-20">
            </div>
        </div>
      )}

    </div>
  );
};

export default AppLayout;
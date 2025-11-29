import Navbar from '../commponents/Navbar'; // Navbar එක උඩින් තියෙන්න ඕන නිසා
import { useTheme } from '../Context/ThemeContext';

const Profile = () => {
  // Global Context එකෙන් theme එකයි, changeTheme function එකයි ගන්නවා
  const { theme, changeTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-2xl mx-auto p-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Settings
        </h1>

        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Appearance
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Choose how SmartNotes AI looks to you. Select a single theme.
          </p>

          <div className="flex gap-4">
            {/* Light Mode Card */}
            <div 
              onClick={() => changeTheme('light')}
              className={`cursor-pointer w-1/2 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
                ${theme === 'light' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
            >
              <span className="text-4xl">☀️</span>
              <span className={`font-medium ${theme === 'light' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}>
                Light Mode
              </span>
            </div>

            {/* Dark Mode Card */}
            <div 
              onClick={() => changeTheme('dark')}
              className={`cursor-pointer w-1/2 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
                ${theme === 'dark' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
            >
              <span className="text-4xl">🌙</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>
                Dark Mode
              </span>
            </div>
          </div>
        </div>

        {/* Other Settings (Example) */}
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Account Settings
          </h2>
          <button className="text-red-500 hover:text-red-600 font-medium">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
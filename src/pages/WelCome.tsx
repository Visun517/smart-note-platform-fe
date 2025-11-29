import Navbar from "../commponents/Navbar";
import heroImage from "../assets/heroimage.png";
import Footer from "../commponents/Footer";
import { useNavigate } from "react-router-dom";

function WelCome() {

  const navigate = useNavigate();
  
  return (
    <>
      <div className="min-h-screen bg-gray-200 flex flex-col font-sans">
        {/* 1. Navbar එක */}
        <Navbar />

        {/* 2. Hero Section (ප්‍රධාන කොටස) */}
        <header className="flex-grow flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 md:py-20">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12">
              {/* Left Side: Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
                  🚀 AI-Powered Study Companion
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                  Study Smarter, <br className="hidden md:block" />
                  Not <span className="text-blue-500">Harder.</span>
                </h1>

                <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                  Transform your messy lecture notes into clear summaries,
                  flashcards, and quizzes instantly. Just upload or speak, and
                  let AI do the rest.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <button className="w-full sm:w-auto bg-blue-500 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:shadow-blue-300 transform active:scale-95 transition-all duration-200" onClick={() => navigate('/auth/signup')}>
                    Get Started
                  </button>
                  <button className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-gray-700 hover:bg-gray-50 border border-gray-200 transition-all duration-200">
                    View Demo
                  </button>
                </div>

                {/* Trust Badge (Optional) */}
                <p className="mt-8 text-sm text-gray-400">
                  Trusted by 1,000+ students • No credit card required
                </p>
              </div>

              {/* Right Side: Image (ඔබේ Illustration එක) */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={heroImage}
                  alt="Student relaxing while AI studies"
                  className="w-full max-w-lg object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </header>

        {/* 3. Features Section (ඔබේ Project එකේ විශේෂාංග) */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why use SmartNotes?
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Everything you need to ace your exams, powered by advanced AI
                technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-6">
                  📝
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Instant Summaries
                </h3>
                <p className="text-gray-500">
                  Upload long lecture notes and get concise key points in
                  seconds using Gemini AI.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-6">
                  🧠
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Quiz Generator
                </h3>
                <p className="text-gray-500">
                  Test your knowledge immediately. Our system automatically
                  creates quizzes from your notes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {/* Icon Section - Changed to Orange/Amber for 'Ideas/Explanation' */}
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl mb-6">
                  💡
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Smart Explanations
                </h3>

                {/* Description */}
                <p className="text-gray-500">
                  Stuck on a tough concept? Let AI break down complex notes into
                  simple, easy-to-understand explanations instantly.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default WelCome;

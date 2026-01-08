import Navbar from "../commponents/Navbar";
import heroimage from "../assets/heroImage.png";
import Footer from "../commponents/Footer";
import { useNavigate } from "react-router-dom";

function WelCome() {

  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex flex-col min-h-screen font-sans bg-gray-200">
        <Navbar />

        <header className="flex items-center justify-center flex-grow">
          <div className="px-6 py-12 mx-auto max-w-7xl sm:px-8 md:py-20">
            <div className="flex flex-col-reverse items-center gap-12 md:flex-row">
              {/* Left Side: Text Content */}
              <div className="w-full text-center md:w-1/2 md:text-left">
                <span className="inline-block px-3 py-1 mb-6 text-sm font-semibold text-blue-600 border border-blue-100 rounded-full bg-blue-50">
                  🚀 AI-Powered Study Companion
                </span>

                <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
                  Study Smarter, <br className="hidden md:block" />
                  Not <span className="text-blue-500">Harder.</span>
                </h1>

                <p className="max-w-lg mx-auto mb-8 text-lg leading-relaxed text-gray-500 md:mx-0">
                  Transform your messy lecture notes into clear summaries,
                  flashcards, and quizzes instantly. Just upload or speak, and
                  let AI do the rest.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
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

              <div className="flex justify-center w-full md:w-1/2">
                <img
                  src={heroimage}
                  alt="Student relaxing while AI studies"
                  className="object-contain w-full max-w-lg transition-transform duration-500 drop-shadow-xl hover:scale-105"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="py-20 bg-gray-50">
          <div className="px-6 mx-auto max-w-7xl sm:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Why use SmartNotes?
              </h2>
              <p className="max-w-2xl mx-auto text-gray-500">
                Everything you need to ace your exams, powered by advanced AI
                technology.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 mb-6 text-2xl bg-blue-100 rounded-lg">
                  📝
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  Instant Summaries
                </h3>
                <p className="text-gray-500">
                  Upload long lecture notes and get concise key points in
                  seconds using Gemini AI.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 mb-6 text-2xl bg-purple-100 rounded-lg">
                  🧠
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  AI Quiz Generator
                </h3>
                <p className="text-gray-500">
                  Test your knowledge immediately. Our system automatically
                  creates quizzes from your notes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
                {/* Icon Section - Changed to Orange/Amber for 'Ideas/Explanation' */}
                <div className="flex items-center justify-center w-12 h-12 mb-6 text-2xl bg-orange-100 rounded-lg">
                  💡
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">
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

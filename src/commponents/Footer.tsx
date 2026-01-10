import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="pt-16 pb-8 font-sans bg-gray-100 border-t border-gray-100">
      <div className="px-6 mx-auto max-w-7xl sm:px-8">
        {/* --- Top Section: 4 Columns Grid --- */}
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="SmartNotes Logo"
                className="w-auto h-8 opacity-90"
              />
              <span className="text-xl font-bold text-gray-900">
                Smart<span className="text-blue-500">Notes</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Your AI-powered study companion. We turn messy lecture notes into
              clear summaries and quizzes instantly.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Product</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Integration
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal / Resources */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-500">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section: Copyright & Socials --- */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-gray-100 md:flex-row">
          {/* Copyright Text */}
          <p className="text-sm text-center text-gray-400 md:text-left">
            © 2024 SmartNotes AI. All rights reserved.
          </p>

          {/* Social Media Icons (Text or Icons) */}
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-blue-500"
            >
              {/* Facebook Icon (SVG) */}
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-blue-500"
            >
              {/* GitHub Icon (SVG) */}
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

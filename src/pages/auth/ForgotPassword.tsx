import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import signupImage from "../../assets/signup.png";
import { forgotPassword } from "../../services/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetRequest = async (e: FormEvent) => {
    e.preventDefault();

    if (email === "") {
      alert("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      console.log(email)
      const res = await forgotPassword({ email });

      if (res.status === 200 || res.data.success) {
        setIsSubmitted(true);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* --- Left Side: Image Section --- */}
      <div className="hidden lg:flex w-1/2 bg-blue-50 relative items-center justify-center overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob bottom-10 right-10"></div>

        <img
          src={signupImage}
          alt="Forgot Password Illustration"
          className="relative z-10 w-3/4 max-w-md object-contain drop-shadow-xl opacity-90"
        />

        <div className="absolute bottom-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Don't worry! 🔐</h2>
          <p className="text-gray-500 mt-2">
            We'll help you recover your account.
          </p>
        </div>
      </div>

      {/* --- Right Side: Form Section --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 bg-white">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/auth/login"
            className="text-gray-400 hover:text-blue-500 text-sm flex items-center gap-1 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>

        {/* --- Logic: If NOT submitted, show Form. If submitted, show Success Message --- */}
        {!isSubmitted ? (
          <>
            <div className="mb-10">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                🔑
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-500">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleResetRequest} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-full font-bold text-white shadow-lg shadow-blue-200 transform transition-all duration-200 
                  ${
                    loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 hover:shadow-blue-300 active:scale-95"
                  }`}
              >
                {loading ? "Sending Link..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          /* --- Success View (Email Sent) --- */
          <div className="text-center md:text-left animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto md:mx-0">
              ✉️
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Check your email
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We have sent a password reset link to{" "}
              <span className="font-semibold text-gray-800">{email}</span>.
              Please check your inbox (and spam folder) and follow the
              instructions.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => window.open("https://gmail.com", "_blank")}
                className="w-full py-3 rounded-full border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Open Email App
              </button>

              <p className="text-sm text-center md:text-left text-gray-400">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Click to resend
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

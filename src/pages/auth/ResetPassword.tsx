import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import signupImage from "../../assets/signup.png"; 
import { resetPassword } from "../../services/auth";
import toast from "react-hot-toast";

function ResetPassword() {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      toast.error("Please enter a password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // console.log("Token:", token);
      // console.log("New Password:", password);

      const res = await resetPassword({ token, password });
      console.log(res)

      alert("Password reset successful! Please login.");
      navigate("/auth/login");

    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password. Link might be expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* --- Left Side: Image --- */}
      <div className="hidden lg:flex w-1/2 bg-blue-50 relative items-center justify-center overflow-hidden">
        <div className="absolute w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob top-20 right-20"></div>
        <img 
          src={signupImage} 
          alt="Reset Password" 
          className="relative z-10 w-3/4 max-w-md object-contain drop-shadow-xl"
        />
        <div className="absolute bottom-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Almost there! 🚀</h2>
          <p className="text-gray-500 mt-2">Set your new password securely.</p>
        </div>
      </div>

      {/* --- Right Side: Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 bg-white">
        
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500">
            Please enter your new password below.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          
          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3.5 rounded-full font-bold text-white shadow-lg shadow-blue-200 transform transition-all duration-200 
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-blue-300 active:scale-95'}`}
          >
            {loading ? 'Resetting...' : 'Set New Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
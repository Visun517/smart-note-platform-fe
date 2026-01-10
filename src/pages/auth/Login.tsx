import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMyDetials, logIn } from "../../services/auth";
import { useAuth } from "../../Context/authContext";
import signupImage from "../../assets/signup.png";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../services/auth";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const user = { email, password };
      const res: any = await logIn(user);

      const accessToken = res.data.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      const details = await getMyDetials();
      setUser(details.data);

      navigate("/app/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-white">
      <div className="relative items-center justify-center hidden w-1/2 overflow-hidden lg:flex bg-blue-50">
        <div className="absolute top-0 left-0 bg-blue-200 rounded-full opacity-50 w-96 h-96 mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 bg-purple-200 rounded-full opacity-50 w-96 h-96 mix-blend-multiply filter blur-3xl animate-blob"></div>

        <img
          src={signupImage}
          alt="Login Illustration"
          className="relative z-10 object-contain w-3/4 max-w-md transition-transform duration-500 drop-shadow-xl hover:scale-105"
        />

        <div className="absolute text-center bottom-12">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back! 👋</h2>
          <p className="mt-2 text-gray-500">Resume your learning journey.</p>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full px-8 py-12 bg-white lg:w-1/2 sm:px-12 lg:px-24">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-blue-500"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">Log In</h1>
          <p className="text-gray-500">
            Enter your details to access your smart notes.
          </p>
        </div>

        <form onSubmit={handleLogIn} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 transition-all duration-200 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 transition-all duration-200 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 flex py-3.5 justify-center">
          <div className="w-[300px]">
            {" "}
            {/* Change width as you want */}
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                try {
                  const res = await googleAuth(credentialResponse.credential);
                  localStorage.setItem(
                    "accessToken",
                    res.data.data.accessToken
                  );
                  navigate("/app/dashboard");
                } catch (err) {
                  console.log("Google Login Failed", err);
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>

        <p className="mt-8 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-bold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState, type FormEvent } from "react";
import { signUp } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom"; 
import signupImage from "../assets/signup.png"; 
import toast from "react-hot-toast";

function SignUp() { 

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true); 

    try {
      const user = { username, email, password };
      const res: any = await signUp(user);

      console.log(res);

      alert('User registration successful..!');
      navigate('/auth/login');

    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-white">
      
      <div className="relative items-center justify-center hidden w-1/2 overflow-hidden lg:flex bg-blue-50">
        <div className="absolute bg-blue-100 rounded-full w-96 h-96 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        
        <img 
          src={signupImage} 
          alt="Sign Up Illustration" 
          className="relative z-10 object-contain w-3/4 max-w-md drop-shadow-xl"
        />
        
        <div className="absolute px-8 text-center bottom-10">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Join SmartNotes AI</h2>
          <p className="text-gray-500">Create summaries and quizzes instantly.</p>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full px-8 py-12 bg-white lg:w-1/2 sm:px-12 lg:px-24">
        
        <div className="mb-8">
            <Link to="/" className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-blue-500">
              ← Back to Home
            </Link>
        </div>

        <div className="mb-10">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500">
            Start learning smarter with AI today.
          </p>
        </div>

        
        <form onSubmit={handleSignUp} className="space-y-6">
          
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Username</label>
            <input 
              type="text" 
              placeholder="Enter your username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-3 text-gray-800 transition-all duration-200 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 text-gray-800 transition-all duration-200 border border-gray-200 outline-none rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>


          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
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
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-blue-300 active:scale-95'}`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

        </form>

        <p className="mt-8 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-bold text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
import { useState, type FormEvent } from "react";
import { signUp } from "../services/auth";
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
    <div className="min-h-screen flex bg-white font-sans">
      
      <div className="hidden lg:flex w-1/2 bg-blue-50 relative items-center justify-center overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        
        <img 
          src={signupImage} 
          alt="Sign Up Illustration" 
          className="relative z-10 w-3/4 max-w-md object-contain drop-shadow-xl"
        />
        
        <div className="absolute bottom-10 text-center px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Join SmartNotes AI</h2>
          <p className="text-gray-500">Create summaries and quizzes instantly.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 bg-white">
        
        <div className="mb-8">
            <Link to="/" className="text-gray-400 hover:text-blue-500 text-sm flex items-center gap-1 transition-colors">
              ← Back to Home
            </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500">
            Start learning smarter with AI today.
          </p>
        </div>

        
        <form onSubmit={handleSignUp} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              placeholder="Enter your username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800"
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800"
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

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
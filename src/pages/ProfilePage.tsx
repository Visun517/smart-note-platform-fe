import { useState, useEffect, useRef } from "react";
import { User, Mail, Lock, Camera, Save, Loader2 } from "lucide-react";
import { useAuth } from "../Context/authContext";
import { getUserDetails, profileUpload, updateUserDetails } from "../services/Profile";
import toast from "react-hot-toast";

function Profile() {
  const { user, setUser } = useAuth(); // Auth Context

  // States
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", 
  });

  // Image Preview
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState("");

  // 1. Initial Data Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserDetails();
        const userData = res.data.user;

        setFormData({
          username: userData.username,
          email: userData.email,
          password: "",
        });
        setPreviewImage(res.data.user.imageUrl || "");
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    };
    fetchData();
  }, []);

  // 2. Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.password) {
      toast.error("Please enter your password to save changes.")
      return;
    }

    setLoading(true);
    try {
      const res = await updateUserDetails(formData);
      setUser(res.data.user);
      
      setFormData({ ...formData, password: "" });
    } catch (error) {
      toast.error("Failed to update profile. Check your password.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Image Upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    setImageLoading(true);
    try {
      const res = await profileUpload(file);
      setUser(res.data.user);
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: Image --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            
            {/* Image Container */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600">
                    {formData.username ? formData.username.charAt(0).toUpperCase() : "U"}
                  </div>
                )}

                {/* Loading Overlay */}
                {imageLoading && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2.5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
                title="Change Photo"
              >
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-800">{formData.username}</h2>
            <p className="text-gray-500 text-sm">{formData.email}</p>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Form --- */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Details</h3>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition placeholder-gray-400"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password <span className="text-xs text-gray-400 font-normal">(Required to save changes)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition placeholder-gray-400"
                    placeholder="Enter new password to update"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
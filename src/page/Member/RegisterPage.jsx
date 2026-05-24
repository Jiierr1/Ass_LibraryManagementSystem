import React, { useState } from 'react';
import { User, Mail, Phone, Lock } from 'lucide-react';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data submitted:', formData);
    // អ្នកអាចបន្ថែម Logic ផ្ញើទៅកាន់ API នៅទីនេះ
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(216, 241, 248, 0.6) 0%, rgba(255, 255, 255, 0.1) 90%)' }}>
      
      {/* Container ធំ */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* ផ្នែកខាងឆ្វេង៖ ផ្ទាំងចុះឈ្មោះ (Form Section) */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cyan-800 mb-2">Join BiblioGlass</h2>
            <p className="text-gray-500 text-sm mb-6">
              Empowering your journey through knowledge.<br />
              Create your member account below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm pr-10"
                    required
                  />
                  <User className="absolute right-3 top-2.5 h-4 w-4 text-cyan-400" />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@university.edu"
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm pr-10"
                    required
                  />
                  <Mail className="absolute right-3 top-2.5 h-4 w-4 text-cyan-400" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm pr-10"
                  />
                  <Phone className="absolute right-3 top-2.5 h-4 w-4 text-cyan-400" />
                </div>
                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                  <span>ℹ</span> Used for SMS overdue alerts
                </p>
              </div>

              {/* Passwords (Flex row) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm pr-10"
                      required
                    />
                    <Lock className="absolute right-3 top-2.5 h-4 w-4 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Info Box */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 flex items-start gap-2">
                <span className="text-blue-600 text-xs mt-0.5">🛡️</span>
                <p className="text-[11px] text-blue-950 font-medium leading-tight">
                  Password must be at least 8 characters with one special symbol.
                </p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r cursor-pointer from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white font-medium py-2.5 rounded-xl transition duration-200 shadow-md shadow-cyan-100 mt-2"
              >
                Register
              </button>
            </form>
          </div>

          {/* Footer ខាងឆ្វេង */}
          <div className="text-center text-xs text-gray-500 mt-6">
            Already have an account? <a href="#login" className="text-cyan-600 font-semibold hover:underline">Login</a>
          </div>
        </div>

        {/* ផ្នែកខាងស្តាំ៖ បដាព័ត៌មាន (Info Section) */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-between items-center text-center relative" style={{ backgroundColor: '#e2f6fc', backgroundImage: 'radial-gradient(circle at 80% 20%, #ffffff 0%, #e2f6fc 100%)' }}>
          
          <div className="w-full flex flex-col items-center my-auto">
            {/* រូបភាពកណ្ដាល (អាចជំនួស src ដោយរូបភាពពិតរបស់អ្នក) */}
            <div className="w-64 h-64 bg-slate-900 rounded-lg overflow-hidden shadow-lg mb-6 flex items-center justify-center border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600" 
                alt="Library" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            <h3 className="text-2xl font-bold text-cyan-900 mb-2">Discover More</h3>
            <p className="text-cyan-800 text-xs max-w-sm leading-relaxed mb-6">
              Gain access to over 500,000 digital resources, rare manuscripts, and a community of lifelong learners.
            </p>

            {/* Icons ខាងក្រោម */}
            <div className="flex gap-6 justify-center text-cyan-900 text-[11px] font-semibold">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white p-2 rounded-full shadow-sm">📚</div>
                <span>Books</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white p-2 rounded-full shadow-sm">🏅</div>
                <span>Certificates</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white p-2 rounded-full shadow-sm">👥</div>
                <span>Community</span>
              </div>
            </div>
          </div>

          {/* Footer ខាងស្តាំ */}
          <div className="text-center text-xs mt-6 text-cyan-900">
            <div className="font-bold tracking-wide">BiblioGlass</div>
            <div className="text-[10px] text-cyan-700/70 mt-0.5">© 2026 Management Portal</div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default RegisterPage;
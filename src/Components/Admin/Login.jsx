import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = { email, password };

    dispatch(loginUser(credentials));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-white opacity-40" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Glass Effect Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-105">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-300">Sign in to continue your journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div className={`relative transition-all duration-300 ${focusedField === 'email' ? "scale-105" : ""}`}>
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Password */}
              <div className={`relative transition-all duration-300 ${focusedField === 'password' ? "scale-105" : ""}`}>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

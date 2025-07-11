import React, { useState, useContext } from "react";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading ] = useState(true);
  const { captain, setCaptainData } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}captain/login`,
      captainData
    );

    if (response && response.status >= 200 && response.status < 300) {
      const captainData = response.data.captain;
      console.log("User logged in successfully:", captainData);
      alert("User logged in successfully");
      setCaptainData(captainData.captain);
      localStorage.setItem("captain", JSON.stringify(captainData.captain));
      localStorage.setItem("token", response.data.token);
      navigate("/CaptainHome");
      setEmail("");
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/30 to-black/70" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-white/10 rounded-full blur-lg animate-bounce" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Captain Login
            </h2>
            <p className="text-gray-300 text-sm">
              Welcome back, captain! Ready to hit the road?
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0"
                />
                Remember me
              </label>
              <Link
                href="#"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 group"
            >
              <span>Sign In</span>
              <ArrowRight
                className={`w-5 h-5 transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </button>
          </div>
          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-300 text-sm">
              Don't have an account?{" "}
              <Link
                to="/captainSignup"
                className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
              >
                Sign up as Captain
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">1.2M+</div>
            <div className="text-xs text-gray-300">Active Captains</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">24/7</div>
            <div className="text-xs text-gray-300">Support</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">4.8★</div>
            <div className="text-xs text-gray-300">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;

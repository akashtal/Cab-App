import React, { use, useState, useContext } from "react";
import { Eye, EyeOff, Mail, Lock, Car, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_API_URL}user/login`,userData );

    if (response && response.status >= 200 && response.status < 300) {
      const userData = response.data.user;
      alert("User logged in successfully");
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", response.data.token);
      navigate("/UserHome");
      setEmail("");
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            {/* Glass Card */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  CabBooking
                </h1>
                <p className="text-gray-300 text-sm">
                  Your journey begins here
                </p>
              </div>

              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2 rounded bg-white/10 border-white/20 text-yellow-400 focus:ring-yellow-400"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-2xl hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Login
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    )}
                  </button>
                </form>
              </div>

              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-gray-400 text-sm">or</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  Continue with Google
                </button>
                <button className="w-full py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  Continue with Facebook
                </button>
              </div>

              <p className="text-center text-gray-300 text-sm mt-8">
                Don't have an account?{" "}
                <button className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                  <Link to="/usersignup">Sign up</Link>
                </button>
              </p>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6">
              By continuing, you agree to our{" "}
              <span className="text-yellow-400 hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-yellow-400 hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

import React, { useState, useContext } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Car,
  Hash,
  Palette,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { setCaptainData } = useContext(CaptainDataContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      setFormData((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          [name]: value,
        },
      }));
    } else if (
      name === "vehicleType" ||
      name === "plate" ||
      name === "color" ||
      name === "capacity"
    ) {
      setFormData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}captain/register`,
        {
          ...formData,
          vehicle: {
            ...formData.vehicle,
            capacity: parseInt(formData.vehicle.capacity, 10),
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setCaptainData(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captainlogin");
      } else {
        alert("Signup failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("An error occurred during signup. Please try again.");
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return (
          formData.fullName.firstName.trim() &&
          formData.fullName.lastName.trim() &&
          formData.email.trim() &&
          formData.password.trim()
        );
      case 2:
        return (
          formData.vehicle.vehicleType &&
          formData.vehicle.plate &&
          formData.vehicle.color &&
          formData.vehicle.capacity
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Mobile Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Mobile Header */}
      <div className="relative z-10 pt-safe-top">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Captain Signup</h1>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Step {currentStep} of 3</span>
          <span className="text-sm text-gray-300">
            {Math.round((currentStep / 3) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Personal Info
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Tell us about yourself
                  </p>
                </div>

                {/* First Name */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Name"
                      value={formData.fullName.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-base"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.fullName.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-base"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="captain@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-16 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
{/* Step 2: Vehicle Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Vehicle Type */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <select
                      name="vehicleType"
                      value={formData.vehicle.vehicleType}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white"
                      required
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="auto-rickshaw">Auto-Rickshaw</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle Plate */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Vehicle Plate
                  </label>
                  <input
                    name="plate"
                    placeholder="MH 12 AB 1234"
                    value={formData.vehicle.plate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white"
                    required
                  />
                </div>

                {/* Vehicle Color */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Vehicle Color
                  </label>
                  <input
                    name="color"
                    placeholder="Red"
                    value={formData.vehicle.color}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white"
                    required
                  />
                </div>

                {/* Vehicle Capacity */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Vehicle Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    min="1"
                    max="8"
                    placeholder="4"
                    value={formData.vehicle.capacity}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Final Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-white text-xl font-bold text-center">
                  Review Your Info
                </h2>
                <div className="text-gray-300 text-sm">
                  <p>
                    Name: {formData.fullName.firstName}{" "}
                    {formData.fullName.lastName}
                  </p>
                  <p>Email: {formData.email}</p>
                  <p>Vehicle Type: {formData.vehicle.vehicleType}</p>
                  <p>Plate: {formData.vehicle.plate}</p>
                  <p>Color: {formData.vehicle.color}</p>
                  <p>Capacity: {formData.vehicle.capacity}</p>
                </div>
                <label className="flex items-center gap-2 text-white text-sm">
                  <input type="checkbox" required /> I agree to the{" "}
                  <Link to="#" className="text-yellow-400 underline">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link to="#" className="text-yellow-400 underline">
                    Privacy
                  </Link>
                </label>
              </div>
            )}


            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex-1 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-base"
                >
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepComplete(currentStep)}
                  className={`flex-1 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-base ${
                    isStepComplete(currentStep)
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-base"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Create Account</span>
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Benefits Cards - Mobile Layout */}
        <div className="mt-6 space-y-4">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              ₹25,000+
            </div>
            <div className="text-xs text-gray-300">Monthly Earnings</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 text-center">
              <div className="text-xl font-bold text-yellow-400 mb-1">24/7</div>
              <div className="text-xs text-gray-300">Flexible Hours</div>
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 text-center">
              <div className="text-xl font-bold text-yellow-400 mb-1">
                100K+
              </div>
              <div className="text-xs text-gray-300">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <Link
            to="/captainlogin"
            className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;

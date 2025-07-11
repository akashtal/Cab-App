import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg1.jpg')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white min-h-screen px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to QuickRide
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
          Get a ride in minutes or earn by driving your own car. Safe, fast, and affordable.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button className="px-6 py-3 text-lg rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition">
            <Link to="/UserLogin">Book a Ride</Link>
          </button>
            <button className="px-6 py-3 text-lg rounded-full bg-blue-400 text-black hover:bg-yellow-500 transition">
            <Link to="/CaptainLogin">Captain Login</Link>
          </button>
        </div>
        
      </div>
    </div>
  );
}

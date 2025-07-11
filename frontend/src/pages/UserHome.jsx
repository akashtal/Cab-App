import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsCash } from "react-icons/bs";

const rideOptions = [
  {
    type: "Auto",
    price: "₹102.09",
    time: "10:57pm · 3 min",
    icon: "🛺",
  },
  {
    type: "Moto",
    price: "₹40.00",
    time: "1 min",
    icon: "🏍️",
    badge: "Faster",
  },
  {
    type: "Uber Go",
    price: "₹149.98",
    time: "10:56pm · 2 min",
    icon: "🚗",
    discount: "₹169.93",
  },
];

const UserHome = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [selectedRide, setSelectedRide] = useState("Auto");

  const handleChoose = (type) => {
    setSelectedRide(type);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans pb-24">
      {/* Location Disabled Notice */}
      <div className="bg-yellow-700 text-sm text-center py-2">
        📍 Location sharing disabled. <span className="underline cursor-pointer">Tap here to enable</span>
      </div>

      {/* Pickup & Drop Inputs */}
      <div className="mt-6 px-5 space-y-4">
        <div className="flex items-center bg-[#2a2a2a] px-4 py-3 rounded-full">
          <FaMapMarkerAlt className="text-green-400 mr-3" />
          <input
            type="text"
            placeholder="Enter pickup location"
            className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>

        <div className="flex items-center bg-[#2a2a2a] px-4 py-3 rounded-full">
          <MdLocationOn className="text-red-400 mr-3" />
          <input
            type="text"
            placeholder="Enter drop location"
            className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
          />
        </div>
      </div>

      {/* Ride Options: Only show if both pickup and drop are filled */}
      {pickup && drop && (
        <div className="mt-8">
          {/* Placeholder for Map */}
          <div className="bg-gray-800 h-48 flex items-center justify-center text-gray-400">
            [Map Placeholder]
          </div>

          {/* Ride Choices */}
          <div className="bg-[#1c1c1c] rounded-t-3xl mt-[-1rem] pt-4 px-5 pb-5">
            <p className="text-lg font-semibold text-center mb-1">Choose a ride</p>
            <p className="text-xs text-gray-400 text-center mb-4">
              Suggested fares are slightly higher due to increased demand
            </p>

            {rideOptions.map((ride) => (
              <div
                key={ride.type}
                className={`flex justify-between items-center px-4 py-3 rounded-xl mb-3 ${
                  selectedRide === ride.type
                    ? "bg-[#2f2f2f] border border-white"
                    : "bg-[#2a2a2a]"
                } cursor-pointer`}
                onClick={() => handleChoose(ride.type)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ride.icon}</span>
                  <div>
                    <p className="font-semibold">{ride.type}</p>
                    <p className="text-xs text-gray-400">{ride.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{ride.price}</p>
                  {ride.discount && (
                    <p className="line-through text-xs text-red-400">
                      {ride.discount}
                    </p>
                  )}
                  {ride.badge && (
                    <span className="text-blue-400 text-xs border border-blue-500 px-2 py-0.5 rounded-full ml-1">
                      ⚡ {ride.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Payment Method */}
            <div className="flex items-center justify-between mt-3 mb-4 px-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <BsCash className="text-lg" />
                Cash
              </div>
              <span className="text-sm text-gray-400">›</span>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gray-200 text-black py-3 rounded-xl font-semibold text-center text-lg">
              Choose {selectedRide}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;

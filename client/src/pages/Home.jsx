import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/canvas");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 text-white">
      <div className="text-center p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Canvas Builder</h1>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleEnter}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-300"
          >
            Enter Canvas Builder
          </button>

          <button
            onClick={() => navigate("/saved")}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transition duration-300"
          >
            View Saved Canvas
          </button>
        </div>
      </div>
    </div>

  );
};

export default Home;

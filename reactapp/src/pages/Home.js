import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex items-center w-full h-screen justify-center bg-slate-100">
      <div className="flex flex-col w-full sm:w-1/2">
          <button className="border m-1 mx-36 p-3 bg-slate-300 text-gray-600 hover:bg-white hover:text-black transition-all">
        <Link className="w-full" to="/add-subscription">
            Add Subscription
        </Link>
          </button>
          <button className="border m-1 mx-36 p-3 bg-slate-400 text-gray-700 hover:bg-white hover:text-black transition-all">
        <Link to="/extend-subscription">
            Extend Subscription
        </Link>
          </button>
          <button className="border m-1 mx-36 p-3 bg-slate-500 text-gray-800 hover:bg-white hover:text-black transition-all">
        <Link to="/end-subscription">
            End Subscription
        </Link>
          </button>
          <button className="border m-1 mx-36 p-3 bg-slate-600 text-white hover:bg-white hover:text-black transition-all">
        <Link to="/revenue-report">
            Get Revenue Report
        </Link>
          </button>
      </div>
    </div>
  );
};

export default Home;

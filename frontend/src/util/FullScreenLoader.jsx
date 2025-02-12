import React from "react";
import "./FullScreenLoader.css";

const FullScreenLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-main">
      <div className="relative w-32 h-32 ">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute w-full h-full rotate-[18deg]"
            style={{ transform: `rotate(${-18 * i}deg)` }}
          >
            <span
              data-span="animation"
              className="absolute top-0 left-0 w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_#008f5c,0_0_20px_#008f5c,0_0_40px_#008f5c,0_0_60px_#008f5c,0_0_80px_#008f5c,0_0_100px_#008f5c]"
              style={{ animationDelay: `${-0.1 * i}s` }}
            ></span>
          </span>
        ))}
      </div>
      <span className="text-white absolute font-semibold text-2xl">
        Loading
      </span>
    </div>
  );
};

export default FullScreenLoader;

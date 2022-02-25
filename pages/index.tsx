import React from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="">
      <div className="absolute inset-x-0 top-0 h-[28rem] overflow-hidden -z-10">
        <div className="gradient-canvas absolute h-72 w-72 rounded-full blur-2xl top-12 left-[calc(50%-9rem)]"></div>
      </div>
      <div className="mt-32 flex justify-center">
        <div className="logo-shadow-overlay bg-transparent rounded-[24px] shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="106"
            height="106"
            fill="none"
          >
            <rect width="106" height="106" rx="24" fill="url(#base-gradient)" />
            <mask
              id="a"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="22"
              y="24"
              width="62"
              height="58"
            >
              <rect
                x="22"
                y="40.281"
                width="18"
                height="41.719"
                rx="9"
                fill="#000"
              />
              <rect
                x="44"
                y="53.509"
                width="18"
                height="28.491"
                rx="9"
                fill="#000"
              />
              <rect x="66" y="24" width="18" height="58" rx="9" fill="#000" />
            </mask>
            <g mask="url(#a)">
              <path fill="url(#b)" d="M7 10h92v92H7z" />
            </g>
            <defs>
              <linearGradient
                id="b"
                x1="7"
                y1="56"
                x2="99"
                y2="56"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#dc2626">
                  <animate
                    attributeName="stop-color"
                    values="#dc2626; #ea580c; #16a34a; #0d9488; #0284c7; #c026d3; #dc2626"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="1" stopColor="#f87171">
                  <animate
                    attributeName="stop-color"
                    values="#f87171; #fb923c; #4ade80; #2dd4bf; #38bdf8; #e879f9; #f87171"
                    dur="10s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
              </linearGradient>

              <linearGradient
                x1="50%"
                y1="58.7890337%"
                x2="50%"
                y2="108.211301%"
                id="base-gradient"
              >
                <stop stopColor="#ffffff" offset="0%" />
                <stop stopColor="#dcf1ff" offset="100%" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="mt-28 flex justify-center">
        <div className="flex items-center">
          <input
            type="text"
            className="h-12 pr-10 bg-white border-1 border-slate-200 ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-blue-500 shadow rounded-lg  placeholder-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
            placeholder="Search algo..."
          />
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-none text-slate-300 dark:text-slate-400 -ml-10"
            aria-hidden="true"
          >
            <path d="m19 19-3.5-3.5"></path>
            <circle cx="11" cy="11" r="6"></circle>
          </svg>
        </div>
        {/* <button
          type="button"
          className="flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
        >
          <span className="flex-auto">Search algo...</span>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-none text-slate-300 dark:text-slate-400"
            aria-hidden="true"
          >
            <path d="m19 19-3.5-3.5"></path>
            <circle cx="11" cy="11" r="6"></circle>
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default Home;

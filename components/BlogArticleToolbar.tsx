"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogArticleToolbar() {
  const [light, setLight] = useState(false);

  // add blog-reading class on mount, clean up on unmount
  useEffect(() => {
    document.documentElement.classList.add("blog-reading");
    return () => {
      document.documentElement.classList.remove("blog-reading", "blog-light");
    };
  }, []);

  // control blog-light class for light/dark mode switching
  const toggle = () => {
    setLight((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("blog-light", next);
      return next;
    });
  };

  return (
    <>
      {/* back button — top left */}
      <Link
        href="/blog"
        className="group flex items-center justify-center w-9 h-9 rounded border border-[rgba(0,255,65,0.15)] bg-[#111] hover:bg-[#181818] hover:border-[rgba(0,255,65,0.3)] transition-all duration-200 no-underline"
        aria-label="Back to blog"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-[#555] group-hover:text-terminal-green-dim transition-colors duration-200"
        >
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* light mode toggle — top right */}
      <button
        onClick={toggle}
        className={`group flex items-center justify-center w-9 h-9 rounded border transition-all duration-200 ${
          light
            ? "border-[#ccc] bg-[#f5f5f0] hover:bg-[#eee]"
            : "border-[rgba(0,255,65,0.15)] bg-[#111] hover:bg-[#181818] hover:border-[rgba(0,255,65,0.3)]"
        }`}
        aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      >
        {light ? (
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            className="text-[#555]"
          >
            <path
              d="M13.5 9.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#555] group-hover:text-terminal-green-dim transition-colors duration-200"
          >
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.87 3.87l1.06 1.06M11.07 11.07l1.06 1.06M3.87 12.13l1.06-1.06M11.07 4.93l1.06-1.06"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}

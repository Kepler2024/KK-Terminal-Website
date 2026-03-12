"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CursorBlink from "./CursorBlink";

const links = [
  { href: "/", label: "main" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [typed, setTyped] = useState("");
  const fullText = "serve --port 3000";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 90);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-terminal-bg/92 backdrop-blur-xl border-b border-green-subtle px-4 md:px-10 h-[50px] flex items-center justify-between">
      {/* Prompt */}
      <Link
        href="/"
        className="text-[13px] text-terminal-green font-mono flex items-center no-underline hover:text-terminal-green hover:text-glow-sm"
        aria-label="Go to home"
      >
        <span className="text-terminal-cyan">kk@Nomai-Server</span>
        <span className="text-terminal-amber mx-1.5">$</span>
        <span>{typed}</span>
        <CursorBlink className="!h-[14px] !w-[7px] ml-1" />
      </Link>

      {/* Links */}
      <ul className="flex gap-1.5 list-none">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-bracket text-[12px] font-mono px-3 py-1.5 rounded-sm border transition-all duration-200 no-underline
                  ${
                    isActive
                      ? "text-terminal-green border-green-subtle bg-green-glow text-glow-sm"
                      : "text-terminal-green-dim border-transparent hover:text-terminal-green hover:border-green-subtle hover:bg-green-glow hover:text-glow-sm"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subLinks = [
  { href: "/about", label: "readme" },
  { href: "/about/skill", label: "skill" },
  { href: "/about/timeline", label: "timeline" },
  { href: "/about/gadgets", label: "gadgets" },
  { href: "/about/album", label: "album" },
];

export default function SubpageNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1.5 flex-wrap mb-8">
      {subLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] font-mono px-3 pt-0.5 rounded-sm border transition-all duration-200 no-underline
              ${
                isActive
                  ? "text-terminal-green border-green-subtle bg-green-glow text-glow-sm"
                  : "text-terminal-green-dim border-transparent hover:text-terminal-green hover:border-green-subtle hover:bg-green-glow hover:text-glow-sm"
              }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

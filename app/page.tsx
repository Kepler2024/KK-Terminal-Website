"use client";

import CursorBlink from "@/components/CursorBlink";
import {SiGithub, SiYoutube, SiBilibili,SiX,SiGmail} from "react-icons/si";

const asciiArt = `
 ████████╗███████╗███████╗████████╗
 ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
    ██║   █████╗  ███████╗   ██║
    ██║   ██╔══╝  ╚════██║   ██║
    ██║   ███████╗███████║   ██║
    ╚═╝   ╚══════╝╚══════╝   ╚═╝`;

const contactLinks = [
  {
    href: "",
    label: "GitHub",
    icon: (
      <SiGithub className="w-8 h-8" />
    ),
  },
  {
    href: "",
    label: "Youtube",
    icon: (
      <SiYoutube className="w-8 h-8" />
    ),
  },
  {
    href: "",
    label: "Bilibili",
    icon: (
      <SiBilibili className="w-8 h-8" />
    ),
  },
  {
    href: "",
    label: "X",
    icon: (
      <SiX className="w-7 h-7" />
    ),
  },
  {
    href: "",
    label: "Email",
    icon: (
      <SiGmail className="w-7 h-7" />
    ),
  },
];

export default function HomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-fit">
        {/* ASCII Art */}
        <pre
          className="text-[clamp(0.5rem,1.4vw,1.8rem)] leading-[1.25] text-terminal-green mb-8 opacity-0 animate-fadeInDelay1"
          style={{
            fontFamily: 'monospace',
          }}
        >
          {asciiArt}
        </pre>

        {/* Code Block */}
        <div className="opacity-0 animate-fadeInDelay2 ">
          <div className="text-[clamp(0.9rem,2vw,1.5rem)] space-y-1.5 font-mono">
            <div>
              <span className="text-terminal-comment italic">
                {"// who are you?"}
              </span>
            </div>
            <div>
              <span className="text-terminal-amber">const</span>{" "}
              <span className="text-terminal-green">titan</span> = {"{"}
            </div>
            <div>
              &nbsp;&nbsp;<span className="text-terminal-amber">name</span>:{" "}
              <span className="text-terminal-cyan">{'"Eren Yeager"'}</span>,
            </div>
            <div>
              &nbsp;&nbsp;<span className="text-terminal-amber">init</span>:{" "}
              <span className="text-terminal-cyan">
                {'"845"'}
              </span>
              ,
            </div>
            <div>
              &nbsp;&nbsp;<span className="text-terminal-amber">from</span>:{" "}
              <span className="text-terminal-cyan">
                {'"Shiganshina District"'}
              </span>
              ,
            </div>
            <div>
              &nbsp;&nbsp;<span className="text-terminal-amber">role</span>:{" "}
              <span className="text-terminal-cyan">{'"Attack Titan"'}</span>,
            </div>
            <div>
              &nbsp;&nbsp;<span className="text-terminal-amber">base</span>:{" "}
              <span className="text-terminal-cyan">{'"Paradis Island"'}</span>,
            </div>
            <div className="flex items-center flex-wrap">
              <span>&nbsp;&nbsp;<span className="text-terminal-amber">link</span>: [&nbsp;</span>
              {contactLinks.map((link, i) => (
                <span key={link.label} className="inline-flex items-center">
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={link.label}
                      className=" inline-flex items-center justify-center"
                    >
                      <span className="inline-flex p-3 -m-3 transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,65,0.95)] transform-gpu">
                        {link.icon}
                      </span>
                    </a>
                  ) : (
                    <span
                      aria-label={link.label}
                      className="inline-flex items-center justify-center opacity-40 cursor-default"
                    >
                      <span className="inline-flex p-3 -m-3">
                        {link.icon}
                      </span>
                    </span>
                  )}
                  {i < contactLinks.length - 1 && (
                    <span className="text-terminal-green">&nbsp;,&nbsp;</span>
                  )}
                </span>
              ))}
              <span>&nbsp;]</span>
            </div>
            <div>
              {"};"}
              <CursorBlink />
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}

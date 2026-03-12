import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MatrixRain from "@/components/MatrixRain";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "TerminalTest",
  description: "TerminalTest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-mono bg-terminal-bg text-terminal-green overflow-x-hidden leading-relaxed text-sm`}
      >
        {/* CRT Scanlines */}
        <div className="crt-overlay" />

        {/* Matrix Rain Background */}
        <MatrixRain />

        {/* Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="relative z-[1]">{children}</main>

        {/* Footer */}
        <footer className="relative z-[1] text-center py-8 text-[11px] text-terminal-green-muted border-t border-green-subtle font-mono">
          <p>
            // EOF — built with{" "}
            <span className="text-terminal-green">Next.js</span> +{" "}
            <span className="text-terminal-amber">Tailwind</span> +{" "}
            <span className="text-terminal-cyan">React</span> —{" "}
            <span className="text-terminal-green-dim">TerminalTest</span>
          </p>
        </footer>
      </body>
    </html>
  );
}

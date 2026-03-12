"use client";

export default function CursorBlink({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-terminal-green animate-blink align-text-bottom ${className}`}
      style={{ width: "11px", height: "24px" }}
    />
  );
}

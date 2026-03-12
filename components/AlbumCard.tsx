"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface AlbumCardProps {
  no: string;
  src: string;
  location: string;
  date: string;
  camera?: string;
}

export default function AlbumCard({
  no,
  src,
  location,
  date,
  camera,
}: AlbumCardProps) {
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closeZoom = useCallback(() => setZoomed(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed, closeZoom]);

  /* ─── Inline card (gallery grid) ─── */
  const inlineCard = (
    <div
      className="group cursor-pointer border border-[rgba(0,255,65,0.1)] rounded-lg overflow-hidden bg-terminal-bg2 transition-all duration-300 hover:border-[rgba(0,255,65,0.25)]"
      onClick={() => setZoomed(true)}
    >
      {/* Photo — full aspect ratio, no crop */}
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={`${location} — ${date}`}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Number watermark */}
        <span className="absolute top-3 left-4 font-mono text-[28px] font-bold leading-none text-[rgba(0,255,65,0.1)] group-hover:text-[rgba(0,255,65,0.2)] transition-colors duration-300">
          {no}
        </span>
      </div>

      {/* Info bar */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-mono text-terminal-green-dim truncate">
            {location}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[13px] font-mono text-[#555] px-2 py-[2px] rounded border border-[rgba(0,255,65,0.08)] bg-[rgba(0,255,65,0.02)]">
              {date}
            </span>
            {camera && (
              <span className="text-[13px] font-mono text-[rgba(255,184,0,0.6)] px-2 py-[2px] rounded border border-[rgba(255,184,0,0.12)] bg-[rgba(255,184,0,0.03)] truncate">
                {camera}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── Focus modal ─── */
  const focusModal = (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={closeZoom}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.92)] backdrop-blur-md animate-[fadeIn_200ms_ease-out]" />

      {/* Scanline */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full py-10 px-6">
        {/* Photo */}
        <div
          className="animate-[zoomIn_300ms_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="rounded-lg overflow-hidden border-2 border-[rgba(0,255,65,0.12)]"
            style={{
              boxShadow:
                "0 0 80px rgba(0,255,65,0.05), 0 30px 60px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={src}
              alt={`${location} — ${date}`}
              className="max-w-[90vw] max-h-[75vh] object-contain"
            />
          </div>

          {/* Info plate below photo */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[40px] font-bold leading-none text-[rgba(0,255,65,0.1)]">
                {no}
              </span>
              <div>
                <p
                  className="font-mono text-[18px] text-terminal-green"
                  style={{ textShadow: "0 0 20px rgba(0,255,65,0.25)" }}
                >
                  {location}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[12px] font-mono text-[#666] px-3 py-1 rounded border border-[rgba(0,255,65,0.1)] bg-[rgba(0,255,65,0.03)]">
                    {date}
                  </span>
                  {camera && (
                    <span className="text-[12px] font-mono text-[rgba(255,184,0,0.6)] px-3 py-1 rounded border border-[rgba(255,184,0,0.12)] bg-[rgba(255,184,0,0.03)]">
                      {camera}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Close hint */}
          <div className="text-center mt-6">
            <span className="text-[10px] font-mono tracking-[0.15em] text-[rgba(0,255,65,0.15)]">
              [ ESC or click outside to close ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {inlineCard}
      {mounted && zoomed && createPortal(focusModal, document.body)}
    </>
  );
}

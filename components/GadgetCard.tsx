"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import RevealWrapper from "./RevealWrapper";

interface GadgetCardProps {
  no: string;
  name: string;
  model?: string;
  description: string;
  image?: string;
  since: string;
  retiredAt?: string;
  category: string;
  status: "active" | "retired";
}

export default function GadgetCard({
  no,
  name,
  model,
  description,
  image,
  since,
  retiredAt,
  category,
  status,
}: GadgetCardProps) {
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isActive = status === "active";
  const contentRef = useRef<HTMLDivElement>(null);

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

  /* ─── accent helpers ─── */
  const accent = isActive ? "0,255,65" : "255,184,0";
  const accentFull = isActive ? "text-terminal-green" : "text-[rgba(255,184,0,0.7)]";
  const accentDim = isActive ? "text-terminal-green-dim" : "text-[rgba(255,184,0,0.5)]";
  const accentMuted = isActive ? "text-terminal-green-muted" : "text-[rgba(255,184,0,0.3)]";

  /* ─── inline card (grid view) ─── */
  const inlineCard = (
    <div
      className={`relative border rounded-lg overflow-hidden bg-terminal-bg2 cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-[rgba(0,255,65,0.12)] hover:border-[rgba(0,255,65,0.28)]"
          : "border-[rgba(255,184,0,0.1)] hover:border-[rgba(255,184,0,0.22)]"
      }`}
      onClick={() => setZoomed(true)}
    >
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start justify-between mb-4">
          <span className={`font-mono text-[36px] font-bold leading-none tracking-tight ${isActive ? "text-[rgba(0,255,64,0.38)]" : "text-[rgba(255,183,0,0.3)]"}`}>{no}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-[5px] h-[5px] rounded-full ${isActive ? "bg-terminal-green animate-[pulse_3s_ease-in-out_infinite]" : "bg-[rgba(255,184,0,0.6)]"}`} />
            <span className={`text-[10px] font-mono uppercase tracking-widest ${accentDim}`}>{isActive ? "In Use" : "Retired"}</span>
          </div>
        </div>
        <div className="flex items-baseline gap-3 mb-4">
          <h3 className={`text-[20px] font-bold font-mono flex-shrink-0 ${accentFull}`}>{name}</h3>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[13px] font-mono uppercase tracking-wider px-2 py-[3px] rounded ${isActive ? "text-[rgba(255,184,0,0.8)] border border-[rgba(255,184,0,0.15)] bg-[rgba(255,184,0,0.04)]" : "text-[rgba(255,184,0,0.5)] border border-[rgba(255,184,0,0.1)] bg-[rgba(255,184,0,0.03)]"}`}>{category}</span>
          <span className={`text-[13px] font-mono px-2 py-[3px] rounded ${isActive ? "text-[#8f8f8f] border border-[rgba(0,255,65,0.08)] bg-[rgba(0,255,65,0.02)]" : "text-[rgba(255,184,0,0.35)] border border-[rgba(255,184,0,0.08)] bg-[rgba(255,184,0,0.02)]"}`}>since {since}</span>
          {!isActive && retiredAt && <span className="text-[13px] font-mono px-2 py-[3px] rounded text-[rgba(255,184,0,0.35)] border border-[rgba(255,184,0,0.08)] bg-[rgba(255,184,0,0.02)]">until {retiredAt}</span>}
        </div>
      </div>
      <div className={`mx-6 h-px ${isActive ? "bg-[rgba(0,255,65,0.06)]" : "bg-[rgba(255,184,0,0.06)]"}`} />
      <div className="px-6 py-5">
        {image && (
          <div className={`mb-4 rounded overflow-hidden border ${isActive ? "border-[rgba(0,255,65,0.1)]" : "border-[rgba(255,184,0,0.08)]"}`}>
            <img src={image} alt={name} className={`w-full h-auto object-cover ${isActive ? "" : "sepia-[0.3] opacity-80"}`} />
          </div>
        )}
        <p className={`text-[10px] font-mono uppercase tracking-[0.15em] mb-2 ${accentMuted}`}>Notes</p>
        <p className={`text-[14px] font-mono leading-[1.85] ${isActive ? "text-[#888]" : "text-[rgba(255,184,0,0.4)]"}`}>{description}</p>
      </div>
    </div>
  );

  /* ─── focus / museum exhibit modal (rendered via portal) ─── */
  const focusModal = (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ scrollbarWidth: "thin", scrollbarColor: `rgba(${accent},0.15) transparent` }}
      onClick={closeZoom}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.88)] backdrop-blur-md animate-[fadeIn_200ms_ease-out]" />

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center py-10 px-6 min-h-full">
        <div
          ref={contentRef}
          className={`w-full animate-[zoomIn_300ms_ease-out] h-fit flex items-center gap-10 ${image ? "max-w-[85vw]" : "max-w-[600px]"}`}
        >
          {/* ── Left: Image ── */}
          {image && (
            <div className="flex-shrink-0 w-[50%]" onClick={(e) => e.stopPropagation()}>
              <div
                className={`rounded-lg overflow-hidden border-2 sticky top-12 ${isActive ? "border-[rgba(0,255,65,0.12)]" : "border-[rgba(255,184,0,0.1)]"}`}
                style={{ boxShadow: `0 0 60px rgba(${accent},0.06), 0 20px 40px rgba(0,0,0,0.4)` }}
              >
                <img
                  src={image}
                  alt={name}
                  className={`w-full h-auto object-cover ${isActive ? "" : "sepia-[0.3] opacity-90"}`}
                />
              </div>
            </div>
          )}

          {/* ── Right: Info card ── */}
          <div className="flex-1 min-w-0">
            <div
              onClick={(e) => e.stopPropagation()}
              className={`rounded-lg border overflow-hidden bg-terminal-bg ${isActive ? "border-[rgba(0,255,65,0.12)]" : "border-[rgba(255,184,0,0.1)]"}`}
              style={{ boxShadow: `0 0 40px rgba(${accent},0.04)` }}
            >
              {/* Header with number + status */}
              <div className="px-8 pt-8 pb-6">
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-mono font-bold leading-none"
                    style={{
                      fontSize: "64px",
                      color: `rgba(${accent},0.1)`,
                      textShadow: `0 0 30px rgba(${accent},0.05)`,
                    }}
                  >
                    {no}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-[7px] h-[7px] rounded-full ${isActive ? "bg-terminal-green animate-[pulse_3s_ease-in-out_infinite]" : "bg-[rgba(255,184,0,0.6)]"}`} />
                    <span className={`text-[13px] font-mono uppercase tracking-[0.2em] ${accentDim}`}>{isActive ? "In Use" : "Retired"}</span>
                  </div>
                </div>

                {/* Name + model */}
                <h2
                  className={`font-mono font-bold text-[30px] leading-tight mb-2 ${accentFull}`}
                  style={{ textShadow: `0 0 20px rgba(${accent},0.25)` }}
                >
                  {name}
                </h2>
              </div>

              {/* Meta chips */}
              <div className={`px-8 pb-6 flex items-center gap-3 flex-wrap`}>
                <span className={`text-[15px] font-mono uppercase tracking-wider px-3 py-1 rounded ${isActive ? "text-[rgba(255,184,0,0.8)] border border-[rgba(255,184,0,0.2)] bg-[rgba(255,184,0,0.05)]" : "text-[rgba(255,184,0,0.5)] border border-[rgba(255,184,0,0.12)] bg-[rgba(255,184,0,0.04)]"}`}>{category}</span>
                <span className={`text-[15px] font-mono px-3 py-1 rounded ${isActive ? "text-[#666] border border-[rgba(0,255,65,0.1)] bg-[rgba(0,255,65,0.03)]" : "text-[rgba(255,184,0,0.4)] border border-[rgba(255,184,0,0.1)] bg-[rgba(255,184,0,0.03)]"}`}>since {since}</span>
                {!isActive && retiredAt && <span className="text-[15px] font-mono px-3 py-1 rounded text-[rgba(255,184,0,0.4)] border border-[rgba(255,184,0,0.1)] bg-[rgba(255,184,0,0.03)]">until {retiredAt}</span>}
              </div>

              {/* Divider */}
              <div className={`mx-8 h-px ${isActive ? "bg-[rgba(0,255,65,0.08)]" : "bg-[rgba(255,184,0,0.08)]"}`} />

              {/* Notes */}
              <div className="px-8 py-7">
                <p className={`text-[15px] font-mono uppercase tracking-[0.2em] mb-4 ${accentMuted}`}>
                  Collector&apos;s Notes
                </p>
                <p className={`text-[19px] font-mono leading-[2] ${isActive ? "text-[#999]" : "text-[rgba(255,184,0,0.5)]"}`}>
                  {description}
                </p>
              </div>
            </div>

            {/* Close hint */}
            <div className="text-center mt-5">
              <span className={`text-[15px] font-mono tracking-[0.15em] ${isActive ? "text-[rgba(0,255,65,0.2)]" : "text-[rgba(255,184,0,0.15)]"}`}>
                [ ESC or click outside to close ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <RevealWrapper>
        <div className="group">{inlineCard}</div>
      </RevealWrapper>
      {mounted && zoomed && createPortal(focusModal, document.body)}
    </>
  );
}

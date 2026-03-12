"use client";

import { useState, useCallback } from "react";

const facts = [
  "Fun Fact Test.",
  "Click Refresh to Test.",
];

function getRandomIndex(exclude: number) {
  if (facts.length <= 1) return 0;
  let next: number;
  do {
    next = Math.floor(Math.random() * facts.length);
  } while (next === exclude);
  return next;
}

export default function FunFact() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * facts.length)
  );

  const refresh = useCallback(() => {
    setIndex((prev) => getRandomIndex(prev));
  }, []);

  return (
    <div className="border border-green-subtle rounded bg-terminal-bg2 p-4 mt-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] text-terminal-green-muted font-mono">
          <span className="text-terminal-cyan">~</span>
          <span className="text-terminal-amber mx-1">$</span>
          funfact --random
        </span>
        <button
          onClick={refresh}
          className="text-[11px] text-terminal-green-muted font-mono px-2 py-0.5 border border-green-subtle rounded-sm transition-all duration-200 hover:border-terminal-green-dim hover:text-terminal-green hover:bg-green-glow"
        >
          ↻ refresh
        </button>
      </div>
      <p className="text-[15px] text-terminal-green-dim font-mono leading-relaxed">
        &gt; {facts[index]}
      </p>
    </div>
  );
}

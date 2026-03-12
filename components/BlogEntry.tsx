import Link from "next/link";
import RevealWrapper from "./RevealWrapper";

interface BlogEntryProps {
  date: string;
  category: string;
  categoryType: "tech" | "tutorial" | "thoughts" | "life" | "algorithm";
  title: string;
  readTime?: string;
  slug?: string;
}

const catStyles: Record<string, string> = {
  tech: "text-terminal-green border-terminal-green/20 bg-terminal-green/5",
  tutorial: "text-terminal-amber border-terminal-amber/20 bg-terminal-amber/[0.05]",
  thoughts: "text-terminal-cyan border-terminal-cyan/20 bg-terminal-cyan/[0.05]",
  life: "text-[#ff6b9d] border-[#ff6b9d]/20 bg-[#ff6b9d]/[0.05]",
  algorithm: "text-terminal-cyan border-terminal-cyan/20 bg-terminal-cyan/[0.05]",
};

export default function BlogEntry({
  date,
  category,
  categoryType,
  title,
  slug,
}: BlogEntryProps) {
  const href = slug ? `/blog/${slug}` : "#";

  return (
    <RevealWrapper>
      <Link
        href={href}
        className="border border-green-subtle rounded bg-terminal-bg2 overflow-hidden transition-all duration-300 cursor-pointer hover:border-terminal-green-dim box-glow-hover block no-underline"
      >
        <div className="flex items-center gap-4 px-5 py-4 flex-wrap">
          <span className="text-[11px] text-terminal-green-muted min-w-[90px] font-mono">
            {date}
          </span>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-sm uppercase tracking-wider font-semibold border font-mono ${catStyles[categoryType] || catStyles.tech}`}
          >
            {category}
          </span>
          <span className="flex-1 text-[14px] font-semibold text-terminal-green font-mono">
            {title}
          </span>
        </div>
      </Link>
    </RevealWrapper>
  );
}

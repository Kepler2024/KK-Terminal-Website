import RevealWrapper from "./RevealWrapper";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function TimelineItem({
  date,
  title,
  description,
  isLast = false,
}: TimelineItemProps) {
  return (
    <RevealWrapper>
      <div className="flex gap-5">
        {/* Gutter */}
        <div className="flex flex-col items-center min-w-[20px]">
          <div className="w-3 h-3 rounded-full border-2 border-terminal-green bg-terminal-bg shrink-0 z-[2] dot-glow" />
          {!isLast && (
            <div className="w-px flex-1 bg-gradient-to-b from-terminal-green/15 to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="border border-green-subtle rounded bg-terminal-bg2 p-5 mb-5 flex-1 transition-all duration-300 hover:border-terminal-green-dim box-glow-hover">
          <div className="text-[11px] text-terminal-amber font-semibold mb-1.5 font-mono">
            {date}
          </div>
          <h4 className="text-[15px] font-bold text-terminal-green mb-1.5 font-mono">
            {title}
          </h4>
          <p className="text-[12px] text-terminal-green-dim leading-relaxed font-mono">
            {description}
          </p>
        </div>
      </div>
    </RevealWrapper>
  );
}

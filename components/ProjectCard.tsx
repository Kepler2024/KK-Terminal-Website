import RevealWrapper from "./RevealWrapper";

type ProjectStatus = "active" | "wip" | "archived";

interface ProjectCardProps {
  filename: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  githubUrl?: string;
}

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: {
    label: "RUNNING",
    className: "text-terminal-green border-terminal-green/20 inline-flex items-center gap-1.5",
  },
  wip: {
    label: "IN_PROGRESS",
    className: "text-terminal-amber border-terminal-amber/20",
  },
  archived: {
    label: "ARCHIVED",
    className: "text-terminal-green-muted border-terminal-green-muted/30",
  },
};

export default function ProjectCard({
  filename,
  title,
  description,
  tags,
  status,
  githubUrl,
}: ProjectCardProps) {
  const statusStyle = statusConfig[status];

  return (
    <RevealWrapper className="h-full">
      <a href={githubUrl || "#"} target={githubUrl ? "_blank" : undefined} rel="noopener noreferrer" className="h-full block">
        <div className="border border-green-subtle rounded bg-terminal-bg2 overflow-hidden transition-all duration-300 cursor-pointer hover:border-terminal-green-dim  hover:scale-105 box-glow-hover h-full flex flex-col">
          {/* Title bar */}
          <div className="px-4 py-2.5 border-b border-green-subtle flex justify-between items-center text-[11px] font-mono">
            <span className="text-terminal-green-dim">{filename}</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-terminal-red inline-block" />
              <span className="w-2 h-2 rounded-full bg-terminal-amber inline-block" />
              <span className="w-2 h-2 rounded-full bg-terminal-green inline-block" />
            </div>
          </div>

          {/* Body */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-base font-bold text-terminal-green mb-2 flex items-center gap-2 font-mono">
              <span className="text-lg">▸</span> {title}
            </h3>
            <p className="text-terminal-green-dim text-[12px] mb-3.5 leading-relaxed font-mono">
              {description}
            </p>

            {/* Tags — flex-grow absorbs remaining space */}
            <div className="flex flex-wrap gap-1.5 mb-3.5 flex-grow">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-0.5 rounded-sm border border-terminal-green/10 text-terminal-green-dim bg-terminal-green/[0.04] font-mono h-fit"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Status — always stick to bottom */}
            <span className={`text-[11px] px-2.5 py-0.5 rounded-sm border ${statusStyle.className} font-mono mt-auto w-fit`}>
              {status === "active" && (
                <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-blink inline-block" />
              )}
              {statusStyle.label}
            </span>
          </div>
        </div>
      </a>
    </RevealWrapper>

  );
}

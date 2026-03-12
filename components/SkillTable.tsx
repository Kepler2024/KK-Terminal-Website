import RevealWrapper from "./RevealWrapper";
import { type ReactNode } from "react";

interface Skill {
  name: string;
  icon: ReactNode;
}

interface SkillTableProps {
  category: string;
  skills: Skill[];
}

export default function SkillTable({ category, skills }: SkillTableProps) {
  return (
    <RevealWrapper>
      <div className="border border-green-subtle rounded bg-terminal-bg2 p-5 mb-4">
        <h3 className="text-terminal-amber text-sm font-bold mb-4 font-mono">
          # {category}
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded border border-transparent transition-all duration-200 hover:border-green-subtle hover:bg-green-glow"
            >
              <div className="text-4xl text-terminal-green">{skill.icon}</div>
              <span className="text-[12px] text-terminal-green-dim font-mono text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </RevealWrapper>
  );
}

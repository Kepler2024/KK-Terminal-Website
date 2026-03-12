import TerminalHeader from "@/components/TerminalHeader";
import ProjectCard from "@/components/ProjectCard";
import RevealWrapper from "@/components/RevealWrapper";

const projects = [
  {
    filename: "kk-terminal-site/",
    title: "KK Terminal Site",
    description:
      "My personal terminal-style blog system.",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "HTML"],
    status: "active" as const,
    githubUrl: "https://github.com/Kepler2024/KK-Terminal-Website"
  },
  
];

export default function ProjectsPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 pt-[80px] pb-16">
      <RevealWrapper className="w-full max-w-[1300px]">
        <TerminalHeader command="cd ./terminal-test" title="$ ls ./projectsTEST" />
      </RevealWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1300px] w-fit">
        {projects.map((proj) => (
          <ProjectCard key={proj.filename} {...proj} />
        ))}
      </div>
    </section>
  );
}

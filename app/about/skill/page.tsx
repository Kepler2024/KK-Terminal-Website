import TerminalHeader from "@/components/TerminalHeader";
import RevealWrapper from "@/components/RevealWrapper";
import SkillTable from "@/components/SkillTable";
import SubpageNav from "@/components/SubpageNav";
import {
  SiCplusplus,
  SiPhp,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiLinux,
  SiArchlinux,
  SiSymphony,
  SiBitbucket,
  SiVim,
  SiGnubash,
} from "react-icons/si";
import { 
  VscVscode, 
} from "react-icons/vsc";
import { 
  TbBrandAdobePremier,
  TbBrandAdobePhotoshop,
} from "react-icons/tb";

const skillCategories = [
  {
    category: "Programming Languages",
    skills: [
      { name: "C", icon: <svg viewBox="0 0 128 128" width="1em" height="1em" fill="currentColor"><path d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.8 0-1.7-.4-2.6zM64 88.5c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.3 20l-13 7.5C81.1 44.5 73.1 39.5 64 39.5c-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5z"/></svg> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "Python", icon: <SiPython /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "PHP", icon: <SiPhp /> },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss3 /> },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Symfony", icon: <SiSymphony /> },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> }, 
      { name: "Bitbucket", icon: <SiBitbucket /> },
      { name: "Linux", icon: <SiLinux /> },
      { name: "Vim", icon: <SiVim /> },
      { name: "Bash", icon: <SiGnubash /> },
    ],
  },
  {
    category: "Software & Environment",
    skills: [
      { name: "VS Code", icon: <VscVscode /> },
      { name: "Arch Linux", icon: <SiArchlinux /> },
      { name: "Adobe Premiere", icon: <TbBrandAdobePremier /> },
      { name: "Adobe Photoshop", icon: <TbBrandAdobePhotoshop /> },
    ],
  },
];

export default function SkillPage() {
  return (
    <div className="max-w-[1100px] w-full mx-auto">
      <RevealWrapper>
        <TerminalHeader 
          command="cd ./terminal-test" 
          title="$ fastfetch" 
          className="!mb-5"
        />
        <SubpageNav />
      </RevealWrapper>

      {skillCategories.map((cat) => (
        <SkillTable key={cat.category} {...cat} />
      ))}
    </div>
  );
}

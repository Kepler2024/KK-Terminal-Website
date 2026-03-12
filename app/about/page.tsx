import TerminalHeader from "@/components/TerminalHeader";
import RevealWrapper from "@/components/RevealWrapper";
import SubpageNav from "@/components/SubpageNav";
import FunFact from "@/components/FunFact";

const bio = [
  { emoji: "👤", text: "My name is Eren Yeager — born and raised in Shiganshina District." },
  { emoji: "⚔️", text: "I'm a soldier of the Survey Corps and the inheritor of the Attack Titan, Founding Titan, and War Hammer Titan." },
  { emoji: "🌏", text: "Originally from Shiganshina District, Wall Maria\u00A0🏰, now fighting beyond the Walls." },
  { emoji: "🚀", text: "Currently focused on one mission — to secure freedom for the people of Paradis Island, no matter the cost." },
  { emoji: "🔥", text: "Outside of fighting Titans, you'll find me staring at the ocean 🌊, arguing with Levi 💢, protecting Mikasa & Armin 🤝, or dreaming of the world beyond the Walls 🗺️" },
];

export default function AboutPage() {
  return (
    <div className="max-w-[1100px] w-full mx-auto">
      <RevealWrapper>
        <TerminalHeader
          command="cd ./terminal-test"
          title="$ cat ./README.md"
          className="!mb-5"
        />
        <SubpageNav />
      </RevealWrapper>

      {/* README Card */}
      <RevealWrapper>
        <div className="readme-card border border-[rgba(0,255,65,0.15)] rounded-lg overflow-hidden mb-8 box-glow">
          {/* Terminal-style header bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(0,255,65,0.1)] bg-terminal-bg2">
            <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
            <span className="text-[11px] text-terminal-green-dim font-mono ml-2">README.md</span>
          </div>

          {/* Card body */}
          <div className="bg-terminal-bg px-8 md:px-12 py-10">
            {/* Greeting */}
            <h3 className="text-[28px] md:text-[32px] font-bold font-mono mb-10 text-terminal-green text-glow tracking-tight">
              I&apos;m Eren Yeager.{" "}
              <span className="inline-block origin-[70%_70%] animate-[wave_2s_ease-in-out_infinite]">⚔️</span>
            </h3>

            {/* Bio lines */}
            <div className="space-y-6">
              {bio.map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <span className="text-[20px] leading-[1.7] flex-shrink-0 select-none w-7 text-center">
                    {item.emoji}
                  </span>
                  <p className="text-[15px] md:text-[16px] text-terminal-green-dim font-mono leading-[1.8]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1100px] w-full mx-auto">
          <FunFact />
        </div>
      </RevealWrapper>
    </div>
  );
}

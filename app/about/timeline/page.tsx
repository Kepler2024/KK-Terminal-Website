import TerminalHeader from "@/components/TerminalHeader";
import RevealWrapper from "@/components/RevealWrapper";
import SubpageNav from "@/components/SubpageNav";

const timelineData = [
  {
    age: "19 – 22",
    items: [
      "Unlocked the Founding Titan's full power through contact with Zeke Yeager.",
      "Initiated the Rumbling, unleashing millions of Wall Titans upon the world.",
      "Defeated by the Allied Forces and the remaining members of the Survey Corps at Fort Salta.",
    ],
  },
  {
    age: "16 – 19",
    items: [
      "Joined the Survey Corps and participated in the Battle of Trost, sealing the breach in Wall Rose.",
      "Discovered the truth of the world in the basement of his childhood home in Shiganshina.",
      "Traveled to Marley undercover and launched a solo attack on Liberio during the Willy Tybur declaration.",
      "Acquired the War Hammer Titan's power after defeating Lara Tybur.",
    ],
  },
  {
    age: "12 – 15",
    items: [
      "Enlisted in the 104th Training Corps after the fall of Wall Maria.",
      "Graduated 5th in the 104th Training Corps, alongside Mikasa Ackerman and Armin Arlert.",
      "Trained extensively in ODM gear and hand-to-hand combat under Keith Shadis.",
    ],
  },
  {
    age: "10 – 11",
    items: [
      "Witnessed the fall of Wall Maria and the death of his mother Carla Yeager, devoured by the Smiling Titan.",
      "Inherited the Attack Titan and Founding Titan from his father Grisha Yeager.",
      "Fled Shiganshina as a refugee alongside Mikasa and Armin, vowing to destroy all Titans.",
    ],
  },
  {
    age: "0 – 9",
    items: [
      "Born in Shiganshina District, Wall Maria, to Grisha and Carla Yeager.",
      "Rescued Mikasa Ackerman from human traffickers at age 9, killing two of the attackers.",
      "Grew up dreaming of seeing the outside world beyond the Walls, inspired by Armin's forbidden book.",
    ],
  },
];

export default function TimelinePage() {
  return (
    <>
    <section className="flex flex-col items-center justify-center">
      <RevealWrapper className="flex flex-col w-full max-w-[1200px]">
        <TerminalHeader
          command="cd ./terminal-test"
          title="$ git log TEST"
          className="!mb-5"
        />
        <SubpageNav />
      </RevealWrapper>
    
      {/* Timeline card */}
      <RevealWrapper className="flex flex-col w-full max-w-[1200px]">
        <div className="w-full border border-[rgba(0,255,65,0.15)] rounded-lg overflow-hidden box-glow">
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[rgba(0,255,65,0.1)] bg-terminal-bg2">
            <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
            <span className="text-[11px] text-terminal-green-dim font-mono ml-2">
              timeline.log
            </span>
          </div>

          {/* Timeline body */}
          <div className="bg-terminal-bg">
            {timelineData.map((section, si) => (
              <RevealWrapper key={si}>
                <div
                  className={`group relative px-6 md:px-10 py-7 transition-colors duration-300 hover:bg-[rgba(0,255,65,0.015)] ${
                    si !== timelineData.length - 1
                      ? "border-b border-[rgba(0,255,65,0.06)]"
                      : ""
                  }`}
                >
                  {/* Age label */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-terminal-amber flex-shrink-0" />
                    <span className="font-mono text-[15px] font-bold text-terminal-amber">
                      Age {section.age}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="ml-[18px] space-y-1.5">
                    {section.items.map((item, ii) => (
                      <div key={ii} className="flex gap-3 items-start">
                        <span className="text-terminal-green-dark text-[9px] mt-[7px] flex-shrink-0 select-none">
                          ●
                        </span>
                        <span className="font-mono text-[16px] text-terminal-green-dim leading-[1.8] group-hover:text-[#04df3b] transition-colors duration-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </RevealWrapper>
    </section>
    </>
  );
}

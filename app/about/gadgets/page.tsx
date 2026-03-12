import TerminalHeader from "@/components/TerminalHeader";
import RevealWrapper from "@/components/RevealWrapper";
import GadgetCard from "@/components/GadgetCard";
import SubpageNav from "@/components/SubpageNav";

const gadgets = [
  {
    no: "001",
    category: "Test",
    name: "test",
    description:
      "Test description",
    since: "2027-01",
    status: "active" as const,
    image: "/test.png",
  },
  {
    no: "002",
    category: "Test",
    name: "test2",
    description:
      "Test description",
    since: "2027-01",
    retiredAt: "2027-12",
    status: "retired" as const,
    image: "/test.png",
  },
];

export default function GadgetsPage() {
  return (
    <>
      <RevealWrapper className="w-full max-w-[1600px] mx-auto">
        <TerminalHeader
          command="cd ./terminal-test"
          title="$ ls ./museumTEST"
          className="!mb-5"
        />
        <SubpageNav />
      </RevealWrapper>

      {/* Gadget columns - each column is independent, cards never move between columns */}
      {(() => {
        const colCount = 3;
        const cols: typeof gadgets[] = Array.from({ length: colCount }, () => []);
        gadgets.forEach((g, i) => cols[i % colCount].push(g));
        return (
          <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {cols.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-5">
                {col.map((gadget) => (
                  <GadgetCard key={gadget.name} {...gadget} />
                ))}
              </div>
            ))}
          </div>
        );
      })()}
    </>
  );
}

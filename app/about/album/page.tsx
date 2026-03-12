"use client";

import TerminalHeader from "@/components/TerminalHeader";
import RevealWrapper from "@/components/RevealWrapper";
import SubpageNav from "@/components/SubpageNav";
import AlbumCard from "@/components/AlbumCard";

const photos = [
  {
    no: "001",
    src: "/test.png",
    location: "City, Country",
    date: "2077-01",
    camera: "Camera Model",
  },
];

export default function AlbumPage() {
  const colCount = 3;
  const cols: (typeof photos)[] = Array.from({ length: colCount }, () => []);
  photos.forEach((p, i) => cols[i % colCount].push(p));

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <RevealWrapper>
        <TerminalHeader
          command="cd ./terminal-test"
          title="$ ls ./galleryTEST"
          className="!mb-5"
        />
        <SubpageNav />
      </RevealWrapper>

      {/* Masonry gallery — independent columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-5">
            {col.map((photo) => (
              <RevealWrapper key={photo.no}>
                <AlbumCard {...photo} />
              </RevealWrapper>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

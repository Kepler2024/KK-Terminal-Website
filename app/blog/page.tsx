import TerminalHeader from "@/components/TerminalHeader";
import BlogEntry from "@/components/BlogEntry";
import RevealWrapper from "@/components/RevealWrapper";

const posts = [
  {
    date: "2026-03-11",
    category: "tech",
    categoryType: "tech" as const,
    title: "TEST POST",
    summary: "",
    slug: "test",
  },
];

export default function BlogPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 pt-[80px] pb-16">
      <div className="max-w-[1000px] w-full flex flex-col gap-1">
        <RevealWrapper className="w-full">
          <TerminalHeader command="cd ./terminal-test" title="$ ls ./blogTEST" />
        </RevealWrapper>
        {posts.map((post) => (
          <BlogEntry key={post.date + post.title} {...post} />
        ))}
      </div>
    </section>
  );
}

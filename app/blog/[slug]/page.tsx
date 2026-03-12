import RevealWrapper from "@/components/RevealWrapper";
import BlogArticleToolbar from "@/components/BlogArticleToolbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parseMarkdown } from "@/lib/markdown";
import fs from "fs";
import path from "path";

export function generateStaticParams() {
  // contatenate current working directory with content/blog
  const blogDir = path.join(process.cwd(), "content/blog");
  // check if the directory exists, if not return empty
  if (!fs.existsSync(blogDir)) return [];
  // read through files in the dir, fliter .md files
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  // remove .md extension and return as slug
  return files.map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

// markdown file rendering
function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return parseMarkdown(raw);
}

function estimateReadTime(text: string): string {
  const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const words = text.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, "").split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(cjk / 400 + words / 200);
  return `${minutes} min readTime`;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getPost(slug);

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-terminal-green-muted font-mono">404 — post not found</p>
      </section>
    );
  }

  const dateStr =
    post.frontmatter.date instanceof Date
      ? post.frontmatter.date.toISOString().split("T")[0]
      : String(post.frontmatter.date ?? "");

  const category = String(post.frontmatter.category ?? "").toUpperCase();
  const readTime = estimateReadTime(post.content);

  return (
    <section className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1200px] relative">

        <div className="fixed top-[62px] left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="w-full max-w-[1196px] flex items-start justify-between pointer-events-auto">
            <BlogArticleToolbar />
          </div>
        </div>

        <article
          id="blog-article"
          className="mx-auto w-full max-w-[1100px] min-h-screen border-x border-[rgba(0,255,65,0.1)] bg-[#202220] px-8 md:px-16 transition-[background,border-color] duration-400"
        >

          <div className="pt-[80px]" />

          <RevealWrapper>
            <header className="mb-14">
              <h1 className="article-header-title text-[28px] md:text-[38px] font-bold text-[#bfbfbf] leading-[1.2] tracking-tight font-mono mb-6">
                {String(post.frontmatter.title || slug)}
              </h1>
              <div className="flex items-center gap-4 text-[14px] font-mono">
                <span className="article-meta-tag text-terminal-green-dim/70 px-2 py-0.5 border border-terminal-green-dim/20 rounded-sm uppercase tracking-widest text-[12px]">
                  {category}
                </span>
                <span className="article-meta text-[#333]">·</span>
                <span className="article-meta text-[#666]">{dateStr}</span>
                <span className="article-meta text-[#333]">·</span>
                <span className="article-meta text-[#555]">{readTime}</span>
              </div>
              <div className="article-divider mt-8 h-px bg-gradient-to-r from-[#3c3c3c] via-[#3c3c3c] to-transparent" />
            </header>
          </RevealWrapper>

          <div className="prose-article pb-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <RevealWrapper>
            <footer className="article-footer border-t border-[#1a1a1a] mt-8 py-14 flex flex-col items-center gap-4">
              <div className="article-footer-label text-[11px] text-[#333] font-mono tracking-widest uppercase">
                end of article
              </div>
            </footer>
          </RevealWrapper>
        </article>
      </div>
    </section>
  );
}

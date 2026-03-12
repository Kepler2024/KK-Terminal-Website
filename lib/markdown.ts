import matter from "gray-matter";

export function parseMarkdown(raw: string) {
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

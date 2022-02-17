import { join } from "path";
import { readFileSync, readdirSync } from "fs";
import { bundleMDX } from "mdx-bundler";

import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeKatex from "rehype-katex";
import remarkCodeTitle from "./remark-code-title";

import siteConfig from "site.config";

export async function getFiles(type) {
  return readdirSync(join(process.cwd(), "data", type));
}

export async function getFileBySlug(type, slug?) {
  const source = slug
    ? readFileSync(join(process.cwd(), "data", type, `${slug}.mdx`), "utf8")
    : readFileSync(join(process.cwd(), "data", `${type}.mdx`), "utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGfm,
        remarkMath,
        remarkCodeTitle,
      ];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypePrismPlus,
        rehypeKatex,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ] as any;
      return options;
    },
  });

  const tweetUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
    url: `${siteConfig.siteUrl}/${type}/${slug}`,
    text: `I just read "${frontmatter.title}" at visually.\n\n`,
  })}`;

  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      slug: slug || null,
      editUrl: `${siteConfig.repo.editUrl}${type}/${slug}.mdx`,
      tweetUrl,
      ...frontmatter,
    },
  };
}

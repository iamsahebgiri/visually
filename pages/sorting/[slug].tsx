import React, { useMemo } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { getFileBySlug, getFiles } from "lib/mdx";

export default function SortingPage({ code, frontMatter }) {
  // memoize to avoid re-creating the component on every render.
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="p-4">
      <article className="prose prose-slate mb-10 max-w-3xl dark:prose-dark">
        <Component />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getFiles("sorting");
  return {
    paths: allPosts.map((s) => ({
      params: {
        slug: s.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug("sorting", params.slug);
  return { props: post };
};

import React, { useMemo } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import SplitPane from "react-split-pane";
import SimpleBar from "simplebar-react";
import { getFileBySlug, getFiles } from "lib/mdx";

import Playground from "components/playground";
import SEO from "components/seo";

export default function SortingPage({ code, frontMatter }) {
  // memoize to avoid re-creating the component on every render.
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <>
      <SEO
        title={frontMatter.title}
        description={frontMatter.description}
        post={{ tags: frontMatter.tags }}
      />
      <SplitPane split="vertical" minSize="60%" primary="second">
        <div className="absolute inset-0 w-full h-full">
          <SimpleBar style={{ height: "100%", overflow: "auto" }}>
            <div className="p-4">
              <article className="prose prose-slate dark:prose-dark">
                <Component />
              </article>
            </div>
          </SimpleBar>
        </div>
        <Playground />
      </SplitPane>
    </>
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

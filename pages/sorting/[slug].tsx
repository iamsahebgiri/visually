import React, { useMemo } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { getFileBySlug, getFiles } from "lib/mdx";

import ParentSize from "@visx/responsive/lib/components/ParentSize";
import BubbleSort from "components/sorting/bubble-sort";
import SplitPane from "react-split-pane";

export default function SortingPage({ code, frontMatter }) {
  // memoize to avoid re-creating the component on every render.
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <SplitPane split="vertical" minSize="50%" primary="second">
      <div className="absolute inset-0 w-full h-full">
        <div className="h-full overflow-auto">
          <div className="p-4">
            <article className="prose prose-slate dark:prose-dark">
              <Component />
            </article>
          </div>
        </div>
      </div>
      <ParentSize>
        {({ width, height }) => <BubbleSort width={width} height={height} />}
      </ParentSize>
    </SplitPane>
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

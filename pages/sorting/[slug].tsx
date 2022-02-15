import React, { useMemo } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { getFileBySlug, getFiles } from "lib/mdx";
import SEO from "components/seo";

import ParentSize from "@visx/responsive/lib/components/ParentSize";
import BubbleSort from "components/sorting/bubble-sort";
import SplitPane from "react-split-pane";
import Select from "components/select";
import IconButton from "components/icon-button";
import Dropdown from "components/dropdown";
import PlayIcon from "components/icons/play";

const speed = [
  { label: "0.25" },
  { label: "0.5" },
  { label: "0.75" },
  { label: "Normal" },
  { label: "1.25" },
  { label: "1.5" },
  { label: "1.75" },
  { label: "2" },
];

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
          <div className="h-full overflow-auto">
            <div className="p-4">
              <article className="prose prose-slate dark:prose-dark">
                <Component />
              </article>
            </div>
          </div>
        </div>
        <div className="relative h-screen">
          <ParentSize>
            {({ width, height }) => (
              <BubbleSort width={width} height={height} />
            )}
          </ParentSize>

          <div className="absolute z-40 bottom-0 h-16 w-full">
            <div className="flex items-center justify-between px-4">
              <Select lists={speed} index={3} />
              <IconButton>
                <PlayIcon className="mr-2 -ml-1 w-6 h-6 text-blue-500" />
                Run code
              </IconButton>
              <Dropdown />
            </div>
          </div>
        </div>
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

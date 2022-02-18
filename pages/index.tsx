import React from "react";
import type { NextPage } from "next";
import Playground from "components/playground";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Playground />
    </div>
  );
};

export default Home;

import React from "react";

import Services from "./services/Services";
import Team from "./team/Team";
import Gallery from "./gallery/Gallery";

const Content = () => {
  return (
    <main>
      <Services />
      <Team />
      <Gallery />
    </main>
  );
};

export default Content;

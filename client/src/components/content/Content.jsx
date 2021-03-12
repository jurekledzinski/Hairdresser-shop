import React from "react";

import Services from "./services/Services";
import Team from "./team/Team";
import Gallery from "./gallery/Gallery";
import Testimonial from "./testimonial/Testimonial";

const Content = () => {
  return (
    <main>
      <Services />
      <Team />
      <Gallery />
      <Testimonial />
    </main>
  );
};

export default Content;

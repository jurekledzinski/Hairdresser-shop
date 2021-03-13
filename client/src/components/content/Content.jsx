import React from "react";

import Services from "./services/Services";
import Team from "./team/Team";
import Gallery from "./gallery/Gallery";
import Testimonial from "./testimonial/Testimonial";
import Contact from "./contact/Contact";

const Content = () => {
  return (
    <main>
      <Services />
      <Team />
      <Gallery />
      <Testimonial />
      <Contact />
    </main>
  );
};

export default Content;

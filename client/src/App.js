import React, { useContext, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;

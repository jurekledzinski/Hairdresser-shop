import React, { useContext, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import Header from "./components/header/Header";
import Content from "./components/content/Content";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
};

export default App;

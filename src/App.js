import React from "react";
import ScrollPage from "./components/ScrollPage";
import Footer from "./components/Footer";
import "./App.css";
import MatrixRain from "./components/pages/MatrixRain"

function App() {
  return (
    <div className="App">
      <MatrixRain />
      <ScrollPage />
      <Footer />
    </div>
  );
}

export default App;

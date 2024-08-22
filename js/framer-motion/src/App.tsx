import { useState } from "react";
import DrawRect from "./assets/DrawRect";
import Spring from "./assets/Spring";
import "./App.css";
import { motion, useScroll } from "framer-motion";

function App() {
  const { scrollXProgress } = useScroll();
  return (
    <div className="App">
      <motion.div className="progress" style={{ scaleX: scrollXProgress }}>
        <DrawRect />
        <Spring />
      </motion.div>
    </div>
  );
}

export default App;

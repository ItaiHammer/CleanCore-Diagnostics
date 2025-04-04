import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar, { pages } from "./components/Sidebar";
import WelcomePage from "./pages/WelcomePage";
import "./App.css";
import logo from "./assets/icons/logo.svg";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

const loadingVariants = {
  animate: { scale: [1, 1.4, 1] },
};

function App() {
  const [activePage, setActivePage] = useState(pages[0]);
  const [isApiReady, setIsApiReady] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(null);

  useEffect(() => {
    const checkApiReady = setInterval(async () => {
      if (window.pywebview && window.pywebview.api) {
        setIsApiReady(true);
        clearInterval(checkApiReady);
        const seenWelcome = await window.pywebview.api.App.ConfigManager.get_config_value("hasSeenWelcome");
        setHasSeenWelcome(seenWelcome);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (hasSeenWelcome) {
      console.log("Welcome page has been seen.");
    }
  }, [hasSeenWelcome]);

  // loading screen
  if (!isApiReady || hasSeenWelcome === null) {
    return (
      <div className="app-container">
        <div className="loading-screen">
          <motion.img
            variants={loadingVariants}
            animate="animate"
            transition={{ duration: 1, repeat: Infinity, ease: "circOut" }}
            src={logo}
            alt="Loading..."
            className="loading-logo"
          />
        </div>
      </div>
    );
  }

  console.log(`Has seen welcome: ${hasSeenWelcome}`);

  // first time you open the app
  if (!hasSeenWelcome) {
    return (
      <div className="app-container">
        <WelcomePage onComplete={() => setHasSeenWelcome(true)} />
      </div>
    );
  }

  // not loading
  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <div className="content-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage.id}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="page"
          >
            {activePage.element}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

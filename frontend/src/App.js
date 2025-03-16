import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar, { pages } from './components/Sidebar';
import './App.css';
import logo from './assets/icons/logo.svg';

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
  initial: { opacity: 0 },
  animate: { opacity: 1, rotate: 360 },
  exit: { opacity: 0 },
};

function App () {
  const [activePage, setActivePage] = useState(pages[0]);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    const checkApiReady = setInterval(() => {
      if (window.pywebview && window.pywebview.api) {
        setIsApiReady(true);
        clearInterval(checkApiReady);
      }
    }, 100);
  }, []);

  // loading screen
  if (!isApiReady) {
    return (
      <div className="app-container">
        <motion.div
          className="loading-screen"
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1, repeat: Infinity }}
        >
          <img src={logo} alt="Loading..." className="loading-logo" />
        </motion.div>
      </div>
    );
  }

  // non loading
  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      <div className="content-container">
        <AnimatePresence mode='wait'>
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
};

export default App;

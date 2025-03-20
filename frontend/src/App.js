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
  animate: { scale: [1, 1.4, 1] },
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
        <div
          className="loading-screen"
        >
          <motion.img 
          variants={loadingVariants}
          animate="animate"
          transition={{ duration: 1, repeat: Infinity, ease: "circOut" }}
          
          src={logo} 
          alt="Loading..." 
          className="loading-logo" />
        </div>
      </div>
    );
  }

  // not loading
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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar, { pages } from './components/Sidebar';
import './App.css';

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

function App () {
  const [activePage, setActivePage] = useState(pages[0]);

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

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Home.css';

const sunVariants = {
  initial: {
    opacity: 0.7,
    scale: 0.95,
    y: -10,
    x: -200,
  },
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [0.95, 1.0, 0.95],
    y: [-10, 10, -10],
    x: -200,
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
};

export default function Home() {
  const [hostname, setHostname] = useState();

  return (
    <div className="home-container">
      <motion.div 
        className="sun"
        variants={sunVariants}
        initial="initial"
        animate="animate"
      />
      
      <motion.div 
        className="title-group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="hello-text">HELLO</h1>
        <h2 className="username">Itai Hammer</h2>
      </motion.div>

      <p style={{zIndex: 1}}>Other content...</p>
    </div>
  );
}